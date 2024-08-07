const fs = require('fs')
const path = require('path')
const getFileContentFormatObject = require('../utils/getFileContentFormatObject')
const { ZH_FILE_PATH, LANGUAGE_DIR } = require('../constance')
const { deepSyncObj } = require('../utils/index.js')
const chalk = require('chalk')

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
      let currentTo = file.split('.')[0]
      const target = await getFileContentFormatObject(`${LANGUAGE_DIR}/${file}`)
      const lang_object = await deepSyncObj({ origin, target, currentTo })
      const fileContent = `
        const ${currentTo}_local=${JSON.stringify(lang_object)};
        export default ${currentTo}_local`
      fs.writeFileSync(`${LANGUAGE_DIR}/${file}`, fileContent)
      console.log(`${chalk.green(`${LANGUAGE_DIR}/${file}文件内容写入成功`)}`)
    })
  })
}

module.exports = updateAllLanguageFile
