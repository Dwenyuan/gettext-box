import { json2Translation, excel2Translation } from '../read-po-file'
import { readFile } from 'xlsx'
import { resolve } from 'path'


describe('测试转换json/excel文件', () => {
  it('测试转换json文件', () => {
    const result = json2Translation({ 名: 'First name' })
    expect(result).toMatchObject({
      '': {
        名: {
          msgid: '名',
          msgstr: ['First name']
        }
      }
    })
  })
  it('测试转换正常excel文件', () => {
    const workBook = readFile(resolve(__dirname, './data-file.test.xlsx'), {
      type: 'binary'
    })
    const result = excel2Translation(workBook)
    expect(result).toMatchObject({
      '': {
        请填写收件人名: {
          msgid: '请填写收件人名',
          msgstr: ['Please enter first name']
        },
        请填写收件人姓: {
          msgid: '请填写收件人姓',
          msgstr: ['Please enter last name']
        }
      },
      'context-A': {
        请选择国家: {
          msgctxt: 'context-A',
          msgid: '请选择国家',
          msgstr: ['Please choose country']
        },
        所在地区: {
          msgctxt: 'context-A',
          msgid: '所在地区',
          msgstr: ['Regions']
        }
      }
    })
  })
  it('测试转换简化excel文件', () => {
    const workBook = readFile(resolve(__dirname, './simple-file.test.xlsx'), {
      type: 'binary'
    })
    const result = excel2Translation(workBook)
    expect(result).toMatchObject({
      '': {
        请填写收件人名: {
          msgid: '请填写收件人名',
          msgstr: ['Please enter first name']
        },
        请填写收件人姓: {
          msgid: '请填写收件人姓',
          msgstr: ['Please enter last name']
        },
        请选择国家: {
          msgid: '请选择国家',
          msgstr: ['Please choose country']
        },
        所在地区: {
          msgid: '所在地区',
          msgstr: ['Regions']
        }
      }
    })
  })
})
