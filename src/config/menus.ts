import {
  // eslint-disable-next-line no-unused-vars
  BrowserWindow,
  // eslint-disable-next-line no-unused-vars
  MenuItemConstructorOptions,
  // eslint-disable-next-line no-unused-vars
  MenuItem
} from 'electron'
import { readPoFile } from 'services/read-po-file'

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
            const { filePath, content } = await readPoFile()
            mainWindow.webContents.send('readed', { filePath, content })
          }
        },
        {
          id: '12',
          label: '保存',
          accelerator: 'CmdOrCtrl+s',
          click: async () => {
            await mainWindow.webContents.send('save-file')
          }
        },
        {
          id: '13',
          label: '卸载文件',
          click: () => {
            mainWindow.webContents.send('unread-file')
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
