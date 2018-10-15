'use strict'

import {
  app,
  BrowserWindow,
  Tray,
  Menu
} from 'electron';
import Helplers from '../utils/helpers';
import UserConfig from "../models/UserConfig";
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, tray;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function quit() {
  app.isQuiting = true;
  if (mainWindow) mainWindow.destroy();
  if (tray) tray.destroy();
  if (app) app.quit();
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    minWidth: 800,
    minHeight: 600,
    show: false,
    backgroundColor: '#2e2c29'
  })

  mainWindow.loadURL(winURL)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  // mainWindow.on('closed', () => {
  //   if (UserConfig.getUserConfig().hide_on_close) {
  //     mainWindow.hide();
  //   } else {
  //     mainWindow = null
  //   }
  // })
  mainWindow.on('close', function (event) {
    if (UserConfig.getUserConfig().hide_on_close) {
      // hide the app while user check hide_on_close.
      if (!app.isQuiting) {
        event.preventDefault();
        mainWindow.hide();
      }
      return false;
    } else {
      quit();
    }
  });
  
  // Tray
  tray = new Tray(Helplers.getIconPath()); 
  const contextMenu = Menu.buildFromTemplate([{
      label: 'Edit',
      type: 'normal',
      click() {
        mainWindow.loadURL(`${winURL}?page=edit-page`);
        setTimeout(function () {
          mainWindow.show();
        }, 700);
      }
    },
    {
      label: 'Report',
      type: 'normal',
      click() {
        mainWindow.loadURL(`${winURL}?page=report-page`);
        setTimeout(function () {
          mainWindow.show();
        }, 700);
      }
    },
    {
      label: 'Setting',
      type: 'normal',
      click() {
        mainWindow.loadURL(`${winURL}?page=setting-page`);
        setTimeout(function () {
          mainWindow.show();
        }, 700);
      }
    },
    {
      label: 'About',
      type: 'normal',
      click() {
        mainWindow.loadURL(`${winURL}?page=about-page`);
        setTimeout(function () {
          mainWindow.show();
        }, 700);
      }
    },
    {
      label: 'separator',
      type: 'separator'
    },
    {
      label: 'Quit',
      type: 'normal',
      click() {
        quit();
      }
    },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin' && app.isQuiting) {
//     app.quit()
//   }
// })

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