/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import Jed from 'jed'
import fs from 'fs'
import path from 'path'
import { po } from 'gettext-parser'
import { parse } from 'po2json'
import { app } from 'electron'
console.log(po)
console.log(app.getPath('logs'))
const en_US = parse(
  fs.readFileSync(path.resolve(app.getAppPath(), './build/locale/en_US.po')),
  { format: 'jed' }
)
const zh_CN = parse(
  fs.readFileSync(path.resolve(app.getAppPath(), './build/locale/zh_CN.po')),
  { format: 'jed' }
)
console.log(en_US)

const i18n = new Jed(en_US)

export default i18n
