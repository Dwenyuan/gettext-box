// Modules to control application life and create native browser window

import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import { initListener } from 'services/listener'
import { menuTemplate } from './config/menus'

function createWindow (): void {
  // Create the browser window.
  console.log(path.join(__dirname, 'preload.js'))
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // autoHideMenuBar: true,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const menu = Menu.buildFromTemplate(menuTemplate(mainWindow))
  Menu.setApplicationMenu(menu)
  // and load the index.html of the app.
  console.log('production=>:', production)
  if (production) {
    mainWindow.loadFile('build/index.html')
  } else {
    mainWindow.loadURL('http://localhost:3000/')
  }

  initListener(mainWindow)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
