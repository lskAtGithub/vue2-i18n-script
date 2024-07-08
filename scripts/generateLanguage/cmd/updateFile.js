const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const axios = require('axios')

const { BAIDU_API_URL, BAIDU_SECRET_kEY, BAIDU_APP_ID } = require('../config')
const getFileContentFormatObject = require('../utils/getFileContentFormatObject')
const { ZH_FILE_PATH, LANGUAGE_DIR } = require('../constance')
const { deepSyncObj } = require('../utils/index.js')

let currentTo = '' // 当前语种
async function updateAllLanguageFile() {
  const origin = await getFileContentFormatObject(ZH_FILE_PATH)
  fs.readdir(LANGUAGE_DIR, (err, files) => {
    if (err) {
      throw new Error('无法读取目录')
    }
    const languageFiles = files.filter((file) => {
      return path.extname(file) === '.js' && file !== 'zh.js'
    })
    languageFiles.forEach(async (file) => {
      currentTo = file.split('.')[0]
      const target = await getFileContentFormatObject(`${LANGUAGE_DIR}/${file}`)
      deepSyncObj({ origin, target, getValue }).then((data) => {
        console.log(data)
      })
    })
  })
}

/**
 * @description  返回差异值
 */
async function getValue(value) {
  const salt = new Date().getTime()
  const sign = crypto
    .createHash('md5')
    .update(BAIDU_APP_ID + value + salt + BAIDU_SECRET_kEY)
    .digest('hex')
  const params = {
    q: value,
    from: 'zh',
    appid: BAIDU_APP_ID,
    to: currentTo,
    salt,
    sign
  }
  const res = await axios.get(BAIDU_API_URL, { params })
  try {
    return res.data.trans_result[0].dst
  } catch {
    await getValue(value)
  }
}

module.exports = updateAllLanguageFile
