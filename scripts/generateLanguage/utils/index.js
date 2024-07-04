const fs = require('fs')

/**
 *
 * @param {string} filePath
 * @param {string} content
 * @description 根据传入的文件路径和内容，生成对应的文件
 */
function createLangFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`文件已存在: ${filePath}`)
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

module.exports = { createLangFile, objectHasValue }