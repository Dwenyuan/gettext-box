import { dialog } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { po } from 'gettext-parser'
import { readFile, utils } from 'xlsx'
/**
 * 1. 打开文件对话框
 * 2. 读取po文件
 * 3. 转换po文件为json格式
 * @export
 * @returns
 */
export async function readPoFile (filePath?: string) {
  try {
    if (filePath) {
      const content = await fs.promises.readFile(filePath, {
        encoding: 'utf-8',
        flag: 'r+'
      })
      return { filePath, content: po.parse(content) }
    } else {
      const { filePaths: [source] = [] } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'PO file', extensions: ['po', 'pot'] }]
      })
      const content = await fs.promises.readFile(source, {
        encoding: 'utf-8',
        flag: 'r+'
      })
      return { filePath: source, content: po.parse(content) }
    }
  } catch (error) {
    console.error(error)
  }
}
// TODO: 合并文件需要支持备注合并
export async function readDataFile () {
  const { filePaths: [source] = [] } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'json or excel file', extensions: ['json', 'xls', 'xlsx'] }
    ]
  })
  if (path.extname(source) === '.json') {
    const content = await fs.promises.readFile(source, {
      encoding: 'utf-8',
      flag: 'r+'
    })
    return { filePath: source, content: JSON.parse(content) }
  }
  if (/^\.xlsx?$/.test(path.extname(source))) {
    const { SheetNames = [], Sheets } = readFile(source, { type: 'binary' })
    const content = SheetNames.reduce(
      (pre, name) => [
        ...pre,
        ...utils.sheet_to_json<{ href: string }>(Sheets[name])
      ],
      []
    )
    const result = content.reduce(
      (pre, { subject, translation }) => ({ ...pre, [subject]: translation }),
      {}
    )
    return { filePath: source, content: result }
  }
  return { filePath: source, content: {} }
}
