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
import i18n from '../locale'

const { dnpgettext } = i18n
console.log('dnpgettext', dnpgettext)

type Menus = Array<MenuItemConstructorOptions | MenuItem>
export function menuTemplate (mainWindow: BrowserWindow): Menus {
  return [
    {
      id: '1',
      label: 'File',
      role: 'fileMenu',
      submenu: [
        {
          id: 'new',
          /**
           * this is commit
           */
          label: i18n
            .translate('new project %d')
            .withContext('context')
            .ifPlural(1, 'default %d keys')
            .fetch(1),
          submenu: [
            {
              id: 'from pot',
              label: '从pot文件新建',
              enabled: false
            },
            {
              id: 'from project',
              label: '扫描项目新建',
              enabled: false
            }
          ]
        },
        {
          id: 'edit',
          label: '打开',
          submenu: [
            {
              id: 'open',
              label: '打开po文件',
              click: async (): Promise<void> => {
                const { filePath, content } = await readPoFile()
                mainWindow.webContents.send('readed', { filePath, content })
              }
            }
          ]
        },
        {
          id: '12',
          label: '保存',
          accelerator: 'CmdOrCtrl+s',
          click: (): void => mainWindow.webContents.send('save-file')
        },
        {
          id: 'export',
          label: '导出',
          submenu: [
            {
              id: 'export excel',
              label: '导出全部为excel',
              click (): void {
                mainWindow.webContents.send('export-file')
              }
            },
            {
              id: 'export excel',
              label: '导出未翻译部分为excel',
              click (): void {
                mainWindow.webContents.send('export-file', true)
              }
            }
          ]
        },
        {
          id: '13',
          label: '卸载文件',
          click (): void {
            mainWindow.webContents.send('unread-file')
          }
        },
        {
          id: '14',
          label: '扫描项目',
          click (): void {
            mainWindow.webContents.send('unread-file')
          },
          enabled: false
        },
        { role: 'close' }
      ]
    },
    {
      id: '2',
      label: '合并',
      submenu: [
        {
          id: 'from po/pot',
          label: '从po/pot模板合并',
          click: async (): Promise<void> => {
            const { content } = await readPoFile()
            mainWindow.webContents.send('merge-from-pot', { content })
          }
          // enabled: false
        },
        {
          id: 'from project',
          label: '从项目合并',
          click: async (): Promise<void> => {
            // TODO: 打开文件夹路径，扫描之
            const trans = await openAndScanFile()
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              message: JSON.stringify(trans)
            })
          },
          enabled: false
        },
        {
          id: 'from excel',
          label: '从excel模板合并',
          click: async (): Promise<void> => {
            // TODO: 读取excel文件
          },
          enabled: false
        },
        {
          id: 'from json',
          label: '从json模板合并',
          click: async (): Promise<void> => {
            // TODO: 读取json文件
          },
          enabled: false
        }
      ]
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' }
  ]
}
