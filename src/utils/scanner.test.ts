import { init } from './scanner'
import fs from 'fs'
import path from 'path'
test('', () => {
  init(
    fs.readFileSync(path.resolve(__dirname, '../config/menus.ts'), {
      encoding: 'utf-8'
    })
  )
//   init(`
// i18n
//     .translate('new project %d')
//     .withContext('context')
//     .ifPlural(1, 'default %d keys')
//     .fetch(1)
//   `)
})
