// eslint-disable-next-line no-unused-vars
import { ipcMain, BrowserWindow } from 'electron'
import { selectDirPath } from './select-dir-path'
export function initListener (mainWindow: BrowserWindow) {
  ipcMain.on('open-dir', async () => {
    const paths = await selectDirPath()
    console.log(paths)
    mainWindow.webContents.send('selected-dir', paths)
  })
}
