const fs = require('fs')
const crypto = require('crypto')
const axios = require('axios')
const { BAIDU_API_URL, BAIDU_SECRET_kEY, BAIDU_APP_ID } = require('../config')

/**
 *
 * @param {string} filePath
 * @param {string} content
 * @description 根据传入的文件路径和内容，生成对应的文件
 */
function createLangFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    throw new Error(`文件已存在: ${filePath}`)
  } else {
    // 创建文件并写入内容
    fs.writeFileSync(filePath, content, 'utf8')
  }
}

/**
 *
 * @param {string} value
 * @param {object} obj
 * @returns { boolean | Array }
 * @description 判断对象是否包含某个值(模糊搜索)
 */
function objectHasValue(value, obj) {
  const result = Object.keys(obj)
    .map((item) => {
      if (obj[item].includes(value)) {
        return {
          name: obj[item],
          value: item
        }
      }
    })
    .filter((item) => item)
  if (result.length === 0) return false
  return result
}

/**
 * @description  返回翻译的值
 */
async function getValue(value, currentTo) {
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
  return axios.get(BAIDU_API_URL, { params })
}

async function deepSyncObj({ origin, target, currentTo }) {
  const result = { ...target }
  const keys = Object.keys(origin)
  for (const key of keys) {
    if (
      typeof origin[key] === 'object' &&
      origin[key] !== null &&
      origin[key] !== undefined
    ) {
      result[key] = await deepSyncObj({
        origin: origin[key],
        target: target[key] || {},
        currentTo
      })
    } else {
      if (target[key] === undefined) {
        const recall = async () => {
          const res = await getValue(origin[key], currentTo)
          try {
            result[key] = res.data.trans_result[0].dst
          } catch {
            recall()
          }
        }
        recall()
      }
    }
  }
  return result
}

module.exports = { createLangFile, objectHasValue, deepSyncObj }
