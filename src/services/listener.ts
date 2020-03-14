// eslint-disable-next-line no-unused-vars
import { BrowserWindow, ipcMain } from 'electron'
import { readPoFile } from './read-po-file'
import { selectDirPath } from './select-dir-path'
import { saveFile } from './save-file'
export function initListener (mainWindow: BrowserWindow) {
  ipcMain.on('open-dir', async () => {
    const paths = await selectDirPath()
    console.log(paths)
    mainWindow.webContents.send('selected-dir', paths)
  })
  ipcMain.on('open-file', async (_e, filePath) => {
    const { filePath: path, content } = await readPoFile(filePath)
    mainWindow.webContents.send('readed', { filePath: path, content })
  })

  ipcMain.on('save-file', async (_e, { filePath, content }) => {
    await saveFile(mainWindow, filePath, content)
  })
}
