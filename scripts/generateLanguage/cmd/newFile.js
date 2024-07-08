const getFileContentFormatObject = require('../utils/getFileContentFormatObject')
const { LANGUAGE_MAP, ZH_FILE_PATH } = require('../constance')
const { objectHasValue } = require('../utils/index.js')
const path = require('path')
const baidu = require('../api/baidu')

async function addNewLanguageFile(noTip = false) {
  if (!noTip) {
    console.log(
      `${chalk.dim(
        '支持输入语种名或者语种编码去生成对应的语言文件，语种名使用模糊搜索匹配编码表，避免太多输入导致未能匹配结果,语种编码表参考：'
      )}
      ${chalk.underline.cyan('https://fanyi-api.baidu.com/doc/21')}`
    )
  }
  const answers = await Inquirer.prompt([
    {
      type: 'input',
      name: 'code',
      message: '请输入语言名称或编码:'
    }
  ])
  let options = []
  if (/[\u4e00-\u9fff]/.test(answers.code)) {
    options = objectHasValue(answers.code, LANGUAGE_MAP)
    if (!options) {
      console.log(
        `${chalk.red(
          `语种编码表中并未匹配到[${answers.code}]， 请检查后重新输入`
        )}`
      )
      addNewLanguageFile(true)
    }
  } else {
    if (!Object.keys(LANGUAGE_MAP).includes(answers.code)) {
      console.log(
        `${chalk.red(`并未匹配到语种编码[${answers.code}]， 请检查后重新输入`)}`
      )
      addNewLanguageFile(true)
    } else {
      options = [{ name: answers.code, value: LANGUAGE_MAP[answers.code] }]
    }
  }
  let code = options[0].name
  if (options.length > 1) {
    const choice = await Inquirer.prompt([
      {
        type: 'list',
        name: 'code',
        message: '请选择语种:',
        choices: options
      }
    ])
    code = choice.code
  }
  let zhFilePath = ZH_FILE_PATH
  Inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: `默认路径为：${zhFilePath}，不需更改请直接回车，如需更改请相对于${__dirname}文件目录输入路径: `
    }
  ]).then(async (res) => {
    if (res.path) zhFilePath = path.join(__dirname, res.path)
    getFileContentFormatObject(zhFilePath).then((zhData) => {
      baidu(zhData, code)
    })
  })
}

module.exports = addNewLanguageFile