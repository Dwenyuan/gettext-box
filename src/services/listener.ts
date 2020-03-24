// eslint-disable-next-line no-unused-vars
import { TranslationHeaders } from 'bean/translation-bean'
// eslint-disable-next-line no-unused-vars
import { BrowserWindow, ipcMain } from 'electron'
import { isEmpty } from 'lodash'
import { readDataFile, readPoFile } from './read-po-file'
import { saveFile } from './save-file'
import { scanFiles } from './scan-files'
import { selectDirPath } from './select-dir-path'
import { exportFile } from './export-file'
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
    mainWindow.webContents.send('save-file-complete')
  })

  ipcMain.on('merge-file', async () => {
    const content = await readDataFile()
    mainWindow.webContents.send('merge-file-readed', content)
  })

  ipcMain.on(
    'scan-files',
    async (
      _e,
      param: { paths: string[]; transformHeaders: TranslationHeaders }
    ) => {
      const { paths, transformHeaders } = param
      const dirPaths = isEmpty(paths) ? await selectDirPath() : paths
      if (isEmpty(dirPaths)) {
        mainWindow.webContents.send('scan-finish')
      }
      const message = await scanFiles(dirPaths, transformHeaders)
      mainWindow.webContents.send('scan-finish', message)
    }
  )

  ipcMain.on('export-file', async (_e, { content }) => {
    await exportFile(mainWindow, content)
    mainWindow.webContents.send('export-file-complete')
  })
}
