const axios = require('axios')
const crypto = require('crypto')
const path = require('path')
const { v4 } = require('uuid')
const Inquirer = require('inquirer')

const { createLangFile } = require('../utils/index')
const { BAIDU_API_URL, BAIDU_SECRET_kEY, BAIDU_APP_ID } = require('../config')
const { OUTPUT_DIR } = require('../constance')

let to = ''
// 请求失败的数组
const errorRequestList = []
// 重试次数
let errRepeatNum = 100
let total = 0

// 轮询 errRepeatNum 次
async function clearErrorList(contentStr) {
  return new Promise(async (resolve) => {
    let content = contentStr
    while (errorRequestList.length && errRepeatNum) {
      const errorItem = errorRequestList.shift()
      const salt = new Date().getTime()
      const sign = crypto
        .createHash('md5')
        .update(BAIDU_APP_ID + errorItem.value + salt + BAIDU_SECRET_kEY)
        .digest('hex')
      const params = {
        q: errorItem.value,
        from: 'zh',
        appid: BAIDU_APP_ID,
        to,
        salt,
        sign
      }

      try {
        const res = await axios.get(BAIDU_API_URL, { params })
        content = content.replace(errorItem.errorKey, res.data.translation[0])
      } catch {
        errorRequestList.push(errorItem)
      }
      errRepeatNum--
    }
    resolve(content)
  })
}

// 递归获取对象的单词
async function recursionWord(key, value) {
  if (value && typeof value === 'string') {
    const salt = new Date().getTime()
    const sign = crypto
      .createHash('md5')
      .update(BAIDU_APP_ID + value + salt + BAIDU_SECRET_kEY)
      .digest('hex')
    const params = {
      q: value,
      from: 'zh',
      appid: BAIDU_APP_ID,
      to,
      salt,
      sign
    }
    console.log(`当前正在获取key为${key}的翻译结果`)
    total++
    const res = await axios.get(BAIDU_API_URL, { params })
    try {
      return res.data.trans_result[0].dst
    } catch {
      const errorKey = 'errId:' + v4()
      errorRequestList.push({
        errorKey,
        value
      })
      return errorKey
    }
  } else if (value && typeof value === 'object') {
    let result = Array.isArray(value) ? [] : {}
    for (let key in value) {
      result[key] = await recursionWord(key, value[key])
    }
    return result
  }
}

async function generateLanguageFile(zhData, languageCode) {
  to = languageCode
  console.log('正在通过百度翻译生成文件，请耐心等待...')
  const keyName = `${to.replace('-', '_')}_local`
  const result = await recursionWord(`${keyName}`, zhData)
  const jsonStr = JSON.stringify(result, null, 2)
  let content = `const ${keyName} = ${jsonStr}; export default ${keyName};`
  console.log(
    `本次共翻译${total}条,当前翻译有${errorRequestList.length}条失败,开始重启失败的请求, 请耐心等待.......`
  )
  clearErrorList(content).then((res) => {
    content = res
    console.log(
      `重启后任有${errorRequestList.length}条失败,请自行文件中搜索errId:去独自处理.......`
    )
    let outputPath = path.join(OUTPUT_DIR, `${languageCode}.js`)
    Inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: `默认路径为：${outputPath}， 不需更改可直接回车，如需更改请相对于${__dirname}补全输出文件，文件名推荐使用 ${languageCode}.js ， 以便于后续更新脚本的执行:`
      }
    ]).then((res) => {
      if (res.path) outputPath = path.join(__dirname, res.path)
      createLangFile(outputPath, content)
      console.log(
        '已全部生成， 可前往项目目录下/src/i18n 查看并自行格式化，提示：本次翻译使用百度翻译完成，并不保证其准确定'
      )
    })
  })
}

module.exports = generateLanguageFile
