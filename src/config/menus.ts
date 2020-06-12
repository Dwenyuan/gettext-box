import {
  // eslint-disable-next-line no-unused-vars
  BrowserWindow,
  // eslint-disable-next-line no-unused-vars
  MenuItemConstructorOptions,
  // eslint-disable-next-line no-unused-vars
  MenuItem,
  app,
  dialog
} from 'electron'
import { readPoFile } from 'services/read-po-file'
import { openAndScanFile } from 'services/open-and-scan-file'
import i18n from '../locale'

const { gettext } = i18n
console.log(gettext)

type Menus = Array<MenuItemConstructorOptions | MenuItem>
export function createMenuTemplate(mainWindow: BrowserWindow): Menus {
  console.log(i18n.translate, app.name)
  const isMac = process.platform === 'darwin'
  const firstMenuItems: Menus = isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }
      ]
    : []
  return [
    ...firstMenuItems,
    {
      id: '1',
      role: 'fileMenu',
      submenu: [
        {
          id: 'new',
          label: i18n.translate('new project').fetch(),
          submenu: [
            {
              id: 'from pot',
              label: gettext('从pot/po文件新建'),
              enabled: false
            },
            {
              id: 'from project',
              label: gettext('扫描项目新建'),
              enabled: false
            }
          ]
        },
        {
          id: 'edit',
          label: gettext('打开'),
          submenu: [
            {
              id: 'open',
              label: gettext('打开po文件'),
              click: async (): Promise<void> => {
                const { filePath, content } = await readPoFile()
                mainWindow.webContents.send('readed', { filePath, content })
              }
            }
          ]
        },
        {
          id: '12',
          label: gettext('保存'),
          accelerator: 'CmdOrCtrl+s',
          click: (): void => mainWindow.webContents.send('save-file')
        },
        {
          id: 'export',
          label: gettext('导出'),
          submenu: [
            {
              id: 'export excel',
              label: gettext('导出全部为excel'),
              click(): void {
                mainWindow.webContents.send('export-file')
              }
            },
            {
              id: 'export excel',
              label: gettext('导出未翻译部分为excel'),
              click(): void {
                mainWindow.webContents.send('export-file', true)
              }
            }
          ]
        },
        {
          id: '13',
          label: gettext('卸载文件'),
          click(): void {
            mainWindow.webContents.send('unread-file')
          }
        },
        {
          id: '14',
          label: gettext('扫描项目'),
          click(): void {
            mainWindow.webContents.send('unread-file')
          },
          enabled: false
        },
        { role: 'close' }
      ]
    },
    {
      id: '2',
      label: gettext('合并'),
      submenu: [
        {
          id: 'from po/pot',
          label: gettext('从po/pot模板合并'),
          click: async (): Promise<void> => {
            const { content } = await readPoFile()
            mainWindow.webContents.send('merge-from-pot', { content })
          }
          // enabled: false
        },
        {
          id: 'from project',
          label: gettext('从项目合并'),
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
          label: gettext('从excel模板合并'),
          click: async (): Promise<void> => {
            // TODO: 读取excel文件
          },
          enabled: false
        },
        {
          id: 'from json',
          label: gettext('从json模板合并'),
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
