import * as fs from 'fs'
import { dialog } from 'electron'
import { po } from 'gettext-parser'
import { PoBean } from 'gettext-lib'

export async function saveFile (
  mainWindow: Electron.BrowserWindow,
  filePath: string,
  content: PoBean
) {
  try {
    if (filePath) {
      await fs.promises.writeFile(filePath, po.compile(content))
    } else {
      const recommondFileName = content.headers.Language.trim()
      const { filePath: path, canceled } = await dialog.showSaveDialog(
        mainWindow,
        {
          defaultPath: recommondFileName,
          filters: [{ name: recommondFileName, extensions: ['po'] }]
        }
      )
      if (canceled) {
        return
      }
      const fileContent = po.compile(content)
      console.log(fileContent)

      await fs.promises.writeFile(path, fileContent)
    }
  } catch (error) {
    console.error(error)
  }
}
