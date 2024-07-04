import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const files = require.context('./languages', true, /\.js$/)
let messages = {}
files.keys().forEach((key) => {
  // 设置语言环境
  const name = key.replace(/\.\/|\.js/g, '')
  messages[name] = files(key).default
})

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n
