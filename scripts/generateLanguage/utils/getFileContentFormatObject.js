const fs = require('fs')

// 正则表达式移除单行和多行注释
function removeComments(str) {
  return str.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
}

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
