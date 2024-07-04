const Inquirer = require('inquirer')
const chalk = require('chalk')
const create = require('./cmd/newFile')
const update = require('./cmd/updateFile')
const { OPERATION_LIST } = require('./constance')

// 百度语言表传入值参考： https://fanyi-api.baidu.com/doc/21
Inquirer.prompt([
  {
    type: 'list',
    name: 'choice',
    message: '请选择你要进行的操作：',
    choices: OPERATION_LIST
  }
]).then((answers) => {
  switch (answers.choice) {
    case '1':
      create()
      break
    case '2':
      update()
      break

    default:
      console.log(`${chalk.cyan('并未处理该操作')}`)
      break
  }
})
