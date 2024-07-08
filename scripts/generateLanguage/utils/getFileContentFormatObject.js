const fs = require('fs')

// 正则表达式移除单行和多行注释
function removeComments(str) {
  return str.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
}

/**
 * @param {string} originPath - 文件的完整路径
 * @returns {Promise} 当 Promise 被 resolve 时，返回解析后的 JSON 对象；当 Promise 被 reject 时，返回错误信息
 * @description 读取指定文件路径的内容，对其进行格式化以匹配 JSON 对象的结构，并将其解析为 JSON 对象
 * */
async function getFileContentFormatObject(originPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(originPath, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件失败:', err)
        return
      }
      const match = removeComments(data)
        .match(/\{([\s\S]*)\}/)[0]
        .replace(/'/g, '"')
        .replace(
          /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g,
          function (match, singleQuoted, doubleQuoted) {
            if (singleQuoted !== undefined) {
              return (
                '"' +
                singleQuoted.replace(/"/g, '\\"').replace(/\\'/g, "'") +
                '"'
              )
            } else {
              return '"' + doubleQuoted.replace(/"/g, '\\"') + '"'
            }
          }
        )
        .replace(/([{,]\s*)([^{\s,:"]+)(\s*:)/g, '$1"$2"$3')
        .trim()
      try {
        let jsonData = JSON.parse(match)
        resolve(jsonData)
      } catch (err) {
        console.error('使用JSON格式解析文件失败:', err)
        reject(err)
      }
    })
  })
}

module.exports = getFileContentFormatObject
