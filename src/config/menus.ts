import {
  // eslint-disable-next-line no-unused-vars
  BrowserWindow,
  // eslint-disable-next-line no-unused-vars
  MenuItemConstructorOptions,
  // eslint-disable-next-line no-unused-vars
  MenuItem
} from 'electron'
import { readPoFile } from 'services/read-po-file'
import { selectDirPath } from 'services/select-dir-path'

type Menus = Array<MenuItemConstructorOptions | MenuItem>;
export function menuTemplate (mainWindow: BrowserWindow): Menus {
  return [
    {
      id: '1',
      label: 'File',
      submenu: [
        {
          id: '11',
          label: 'Open File',
          click: async () => {
            const content = await readPoFile()
            mainWindow.webContents.send('readed', content)
          }
        },
        {
          id: '12',
          label: 'Open Dir',
          click: async () => {
            await selectDirPath()
          }
        },
        { role: 'close' }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' }
  ]
}
