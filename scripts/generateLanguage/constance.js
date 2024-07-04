const path = require('path')

const ZH_FILE_PATH = path.join(__dirname, '../../src/i18n/languages/zh.js')
const OUTPUT_DIR = path.join(__dirname, '../../src/i18n/languages/')

const OPERATION_LIST = [
  { name: '根据中文文件新增语言文件', value: '1' },
  { name: '根据中文文件更新语言文件', value: '2' }
]
const LANGUAGE_MAP = {
  ara: '阿拉伯语',
  gle: '爱尔兰语',
  oci: '奥克语',
  alb: '阿尔巴尼亚语',
  arq: '阿尔及利亚阿拉伯语',
  aka: '阿肯语',
  arg: '阿拉贡语',
  amh: '阿姆哈拉语',
  asm: '阿萨姆语',
  aym: '艾马拉语',
  aze: '阿塞拜疆语',
  ast: '阿斯图里亚斯语',
  oss: '奥塞梯语',
  est: '爱沙尼亚语',
  oji: '奥杰布瓦语',
  ori: '奥里亚语',
  orm: '奥罗莫语',
  pl: '波兰语',
  per: '波斯语',
  bre: '布列塔尼语',
  bak: '巴什基尔语',
  baq: '巴斯克语',
  pot: '巴西葡萄牙语',
  bel: '白俄罗斯语',
  ber: '柏柏尔语',
  pam: '邦板牙语',
  bul: '保加利亚语',
  sme: '北方萨米语',
  ped: '北索托语',
  bem: '本巴语',
  bli: '比林语',
  bis: '比斯拉马语',
  bal: '俾路支语',
  ice: '冰岛语',
  bos: '波斯尼亚语',
  bho: '博杰普尔语',
  chv: '楚瓦什语',
  tso: '聪加语',
  dan: '丹麦语',
  de: '德语',
  tat: '鞑靼语',
  sha: '掸语',
  tet: '德顿语',
  div: '迪维希语',
  log: '低地德语',
  ru: '俄语',
  fra: '法语',
  fil: '菲律宾语',
  fin: '芬兰语',
  san: '梵语',
  fri: '弗留利语',
  ful: '富拉尼语',
  fao: '法罗语',
  gla: '盖尔语',
  kon: '刚果语',
  ups: '高地索布语',
  hkm: '高棉语',
  kal: '格陵兰语',
  geo: '格鲁吉亚语',
  guj: '古吉拉特语',
  gra: '古希腊语',
  eno: '古英语',
  grn: '瓜拉尼语',
  kor: '韩语',
  nl: '荷兰语',
  hup: '胡帕语',
  hak: '哈卡钦语',
  ht: '海地语',
  mot: '黑山语',
  hau: '豪萨语',
  kir: '吉尔吉斯语',
  glg: '加利西亚语',
  frn: '加拿大法语',
  cat: '加泰罗尼亚语',
  cs: '捷克语',
  kab: '卡拜尔语',
  kan: '卡纳达语',
  kau: '卡努里语',
  kah: '卡舒比语',
  cor: '康瓦尔语',
  xho: '科萨语',
  cos: '科西嘉语',
  cre: '克里克语',
  cri: '克里米亚鞑靼语',
  kli: '克林贡语',
  hrv: '克罗地亚语',
  que: '克丘亚语',
  kas: '克什米尔语',
  kok: '孔卡尼语',
  kur: '库尔德语',
  lat: '拉丁语',
  lao: '老挝语',
  rom: '罗马尼亚语',
  lag: '拉特加莱语',
  lav: '拉脱维亚语',
  lim: '林堡语',
  lin: '林加拉语',
  lug: '卢干达语',
  ltz: '卢森堡语',
  ruy: '卢森尼亚语',
  kin: '卢旺达语',
  lit: '立陶宛语',
  roh: '罗曼什语',
  ro: '罗姆语',
  loj: '逻辑语',
  may: '马来语',
  bur: '缅甸语',
  mar: '马拉地语',
  mg: '马拉加斯语',
  mal: '马拉雅拉姆语',
  mac: '马其顿语',
  mah: '马绍尔语',
  mai: '迈蒂利语',
  glv: '曼克斯语',
  mau: '毛里求斯克里奥尔语',
  mao: '毛利语',
  ben: '孟加拉语',
  mlt: '马耳他语',
  hmn: '苗语',
  nor: '挪威语',
  nea: '那不勒斯语',
  nbl: '南恩德贝莱语',
  afr: '南非荷兰语',
  sot: '南索托语',
  nep: '尼泊尔语',
  pt: '葡萄牙语',
  pan: '旁遮普语',
  pap: '帕皮阿门托语',
  pus: '普什图语',
  nya: '齐切瓦语',
  twi: '契维语',
  chr: '切罗基语',
  jp: '日语',
  swe: '瑞典语',
  srd: '萨丁尼亚语',
  sm: '萨摩亚语',
  sec: '塞尔维亚-克罗地亚语',
  srp: '塞尔维亚语',
  sol: '桑海语',
  sin: '僧伽罗语',
  epo: '世界语',
  nob: '书面挪威语',
  sk: '斯洛伐克语',
  slo: '斯洛文尼亚语',
  swa: '斯瓦希里语',
  src: '塞尔维亚语（西里尔）',
  som: '索马里语',
  th: '泰语',
  tr: '土耳其语',
  tgk: '塔吉克语',
  tam: '泰米尔语',
  tgl: '他加禄语',
  tir: '提格利尼亚语',
  tel: '泰卢固语',
  tua: '突尼斯阿拉伯语',
  tuk: '土库曼语',
  ukr: '乌克兰语',
  wln: '瓦隆语',
  wel: '威尔士语',
  ven: '文达语',
  wol: '沃洛夫语',
  urd: '乌尔都语',
  spa: '西班牙语',
  heb: '希伯来语',
  el: '希腊语',
  hu: '匈牙利语',
  fry: '西弗里斯语',
  sil: '西里西亚语',
  hil: '希利盖农语',
  los: '下索布语',
  haw: '夏威夷语',
  nno: '新挪威语',
  nqo: '西非书面语',
  snd: '信德语',
  sna: '修纳语',
  ceb: '宿务语',
  syr: '叙利亚语',
  sun: '巽他语',
  en: '英语',
  hi: '印地语',
  id: '印尼语',
  it: '意大利语',
  vie: '越南语',
  yid: '意第绪语',
  ina: '因特语',
  ach: '亚齐语',
  ing: '印古什语',
  ibo: '伊博语',
  ido: '伊多语',
  yor: '约鲁巴语',
  arm: '亚美尼亚语',
  iku: '伊努克提图特语',
  ir: '伊朗语',
  zh: '中文(简体)',
  cht: '中文(繁体)',
  wyw: '中文(文言文)',
  yue: '中文(粤语)',
  zaz: '扎扎其语',
  frm: '中古法语',
  zul: '祖鲁语',
  jav: '爪哇语'
}

const BAIDU_ERROR_INFO = {
  52003: '未授权用户, 请检查appid是否正确或者服务是否开通 ',
  54003: '访问频率受限',
  54004: '账户余额不足',
  54005: '长query请求频繁',
  58001: '译文语言方向不支持',
  58002: '服务当前已关闭',
  20003: '请求内容存在安全风险,请检查请求内容'
}

module.exports = {
  OPERATION_LIST,
  BAIDU_ERROR_INFO,
  LANGUAGE_MAP,
  ZH_FILE_PATH,
  OUTPUT_DIR
}
