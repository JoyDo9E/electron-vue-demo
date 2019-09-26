'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * --arch是指定系统是什么架构的:
 * ia32， 即--arch=ia32， 32位操作系统，也可以在64位操作系统中安装
 * x64， 即--arch=x64， 64位操作系统，使用本架构打包无法再32位操作系统中安装
 * armv7l， 即--arch=armv7l， 使用比较少
 * arm64， 即--arch=arm64， 使用比较少

 * --platform是配置打包成什么平台的安装文件:
 * win系统： win或者win32，即--platform=win或者--platform=win32
 * mac系统：mac或者darwin，即--platform=mac或者--platform=darwin
 * Linux系统：linux， 即--platform=linux
 * 所有平台：all， 即--platform=all

 * 新的写法如下：electron-builder --win --x64
 */

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:7777`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    // useContentSize: true,
    width: 1000,
    // backgroundColor: '#2e2c29',
    // transparent: true,
    frame: false
    // titleBarStyle: 'hidden',
    // autoHideMenuBar: true
  })

  // mainWindow.setMenu(null)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
