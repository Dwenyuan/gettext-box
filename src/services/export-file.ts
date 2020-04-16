// eslint-disable-next-line no-unused-vars
import { PoBean } from 'gettext-lib'
import { dialog } from 'electron'
import { utils, writeFile } from 'xlsx'
export async function exportFile (
  mainWindow: Electron.BrowserWindow,
  content: PoBean
) {
  try {
    console.log(process.sandboxed)

    const recommondFileName = content.headers.Language.trim()
    const { filePath, canceled } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: recommondFileName,
      filters: [{ name: recommondFileName, extensions: ['xlsx'] }]
    })
    if (canceled) {
      return
    }
    // const fileContent = po.compile(content)
    // console.log(fileContent)
    const { translations } = content
    const obj = translations['']
    const list = Object.keys(obj)
      .filter(f => f)
      .map(v => {
        const { msgid, msgstr = [], comments = {} } = obj[v] || {}
        return {
          subject: msgid,
          translation: msgstr.join('\n'),
          remark: comments.translator,
          需要重新翻译: comments.flag === 'fuzzy' ? 'YES' : ''
        }
      })
    const workbook = utils.book_new()
    const sheet = utils.json_to_sheet(list)
    utils.book_append_sheet(workbook, sheet, 'translation')
    writeFile(workbook, filePath)
    // await fs.promises.writeFile(path, content)
  } catch (error) {
    console.error(error)
  }
}
