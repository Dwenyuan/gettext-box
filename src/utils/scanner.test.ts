import { init } from './scanner'
import fs from 'fs'
import path from 'path'
describe('测试扫描方法', () => {
  it('测试读取文件', () => {
    init(
      fs.readFileSync(path.resolve(__dirname, '../config/menus.ts'), {
        encoding: 'utf-8'
      })
    )
  })
  it('测试转换字符', () => {
    const translation = init(`
    i18n
      .translate('new project %d')
      .withContext('context')
      .ifPlural(1, 'default %d keys')
      .fetch(1)
  `)
    expect(translation).toMatchObject({
      translate: {
        'new project %d': {
          // eslint-disable-next-line @typescript-eslint/camelcase
          msgid_plural: 'default %d keys',
          msgctxt: 'context'
        }
      }
    })
  })
})
