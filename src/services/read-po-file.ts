import { dialog } from 'electron'
import * as fs from 'fs'
import { po } from 'gettext-parser'
/**
 * 1. 打开文件对话框
 * 2. 读取po文件
 * 3. 转换po文件为json格式
 * @export
 * @returns
 */
export async function readPoFile (filePath?: string) {
  if (filePath) {
    const content = await fs.promises.readFile(filePath, {
      encoding: 'utf-8',
      flag: 'r+'
    })
    return { filePath, content: po.parse(content) }
  } else {
    const { filePaths: [path] = [] } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'PO file', extensions: ['po', 'pot'] }]
    })
    const content = await fs.promises.readFile(path, {
      encoding: 'utf-8',
      flag: 'r+'
    })
    return { filePath: path, content: po.parse(content) }
  }
}
export async function readDataFile () {
  const { filePaths: [path] = [] } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON file', extensions: ['json'] }]
  })
  const content = await fs.promises.readFile(path, {
    encoding: 'utf-8',
    flag: 'r+'
  })
  return { filePath: path, content: JSON.parse(content) }
}
