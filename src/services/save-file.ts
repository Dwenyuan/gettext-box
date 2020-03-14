import * as fs from 'fs'
import { dialog } from 'electron'
import { po } from 'gettext-parser'

export async function saveFile (
  mainWindow: Electron.BrowserWindow,
  filePath: string,
  content: any
) {
  if (filePath) {
    await fs.promises.writeFile(filePath, po.compile(content))
  } else {
    const { filePath: path } = await dialog.showSaveDialog(mainWindow, {})
    await fs.promises.writeFile(path, po.compile(content))
  }
}
