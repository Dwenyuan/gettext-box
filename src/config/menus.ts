import {
  // eslint-disable-next-line no-unused-vars
  BrowserWindow,
  // eslint-disable-next-line no-unused-vars
  MenuItemConstructorOptions,
  // eslint-disable-next-line no-unused-vars
  MenuItem,
  dialog
} from 'electron'
import { readPoFile } from 'services/read-po-file'
import { openAndScanFile } from 'services/open-and-scan-file'

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
        {
          id: '14',
          label: '扫描项目',
          click: () => {
            mainWindow.webContents.send('unread-file')
          }
        },
        { role: 'close' }
      ]
    },
    {
      id: '2',
      label: '合并',
      submenu: [
        {
          id: '21',
          label: '从PO/POT模板合并',
          click () {
            // TODO: 读取PO/POT文件
          }
        },
        {
          id: '22',
          label: '扫描项目合并',
          click: async () => {
            // TODO: 打开文件夹路径，扫描之
            const trans = await openAndScanFile()
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              message: JSON.stringify(trans)
            })
          }
        }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' }
  ]
}
