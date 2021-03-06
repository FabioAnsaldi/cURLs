const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const url = require('url');
const config = require('../config/app.js');

let win = null;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let server = null;

  if (process.env.DEV) {
    server = `http://${config.server.address}:${config.server.port}`;
  }

  const startUrl = server || url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  // and load the index.html of the app.
  win.loadURL(startUrl);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // ALL <a> tags to open in the default browser
  win.webContents.on('will-navigate', (event, anchorUrl) => {
    event.preventDefault();
    shell.openExternal(anchorUrl);
  });

  // Open the DevTools.
  if (process.env.DEV) {
    win.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.whenReady()
  .then(createWindow)
  .catch((e) => {
    /* eslint-disable no-console */
    console.log(e);
  });

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
