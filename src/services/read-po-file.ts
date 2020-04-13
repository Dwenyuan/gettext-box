/* eslint-disable @typescript-eslint/camelcase */
import { Translation, TranslationsBean } from 'bean/translation-bean'
import { dialog } from 'electron'
import * as fs from 'fs'
import { po } from 'gettext-parser'
import { groupBy } from 'lodash'
import * as path from 'path'
import { readFile, utils, WorkBook } from 'xlsx'

/**
 * 将key-value形式的翻译转换为标准的po结构
 *
 * @export
 * @param {*} source
 * @returns {Record<string, any>}
 */
export function json2Translation (
  source: Record<string, any>
): Record<string, any> {
  const msgids = Object.keys(source)
  return {
    '': msgids.reduce(
      (preMessage, msgid) => ({
        ...preMessage,
        [msgid]: {
          msgid,
          msgstr: [source[msgid]]
        }
      }),
      {}
    )
  }
}

/**
 * 将excel转换为标准的翻译格式
 *
 * @export
 * @param {WorkBook} workBook
 * @returns {Record<string, any>}
 */
export function excel2Translation (workBook: WorkBook): TranslationsBean {
  const { SheetNames = [], Sheets } = workBook
  const content = SheetNames.reduce(
    (pre, name) => [
      ...pre,
      ...utils.sheet_to_json<{ href: string }>(Sheets[name])
    ],
    []
  )
  const contexts = groupBy(content, 'context')
  const contextKeys = Object.keys(groupBy(content, 'context'))
  function mergeMessage (pre, message): Translation {
    const {
      context = '',
      singular_key,
      singular_str,
      plural_key,
      plural_str,
      comments
    } = message
    return {
      ...pre,
      [singular_key]: {
        ...(context ? { msgctxt: context } : {}),
        ...(plural_key ? { msgid_plural: plural_key } : {}),
        ...(comments ? { comments: { translator: comments } } : {}),
        msgid: singular_key,
        msgstr: [singular_str].concat(plural_str ? [plural_str] : [])
      }
    }
  }
  return contextKeys.reduce((preContexts, contextKey) => {
    const context = contexts[contextKey] || []
    const key = contextKey === 'undefined' ? '' : contextKey
    return {
      ...preContexts,
      [key]: context.reduce(mergeMessage, {})
    }
  }, {})
}

/**
 * 1. 打开文件对话框
 * 2. 读取po文件
 * 3. 转换po文件为json格式
 * @export
 * @returns
 */
export async function readPoFile (
  filePath?: string
): Promise<Record<string, any>> {
  // TODO: 切换参数类型
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
export async function readDataFile (): Promise<{
  filePath: string;
  content: Record<string, any>;
}> {
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
    const messages = JSON.parse(content) || {}
    return {
      filePath: source,
      content: json2Translation(messages)
    }
  }
  if (/^\.xlsx?$/.test(path.extname(source))) {
    const workBook = readFile(source, { type: 'binary' })
    return { filePath: source, content: excel2Translation(workBook) }
  }
  return { filePath: source, content: {} }
}
