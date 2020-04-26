import Jed from 'jed'
import fs from 'fs'
import path from 'path'
import { po } from 'gettext-parser'
import { parse } from 'po2json'
import { app } from 'electron'
console.log(po)
console.log(app.getPath('logs'))
// eslint-disable-next-line camelcase
// eslint-disable-next-line @typescript-eslint/camelcase
const en_US = parse(
  fs.readFileSync(path.resolve(app.getAppPath(), './build/locale/en_US.po')),
  { format: 'jed' }
)
// eslint-disable-next-line camelcase
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/camelcase
const zh_CN = parse(
  fs.readFileSync(path.resolve(app.getAppPath(), './build/locale/zh_CN.po')),
  { format: 'jed' }
)
console.log(en_US)

const i18n = new Jed(en_US)

export default i18n
