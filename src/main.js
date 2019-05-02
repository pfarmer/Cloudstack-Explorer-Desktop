/* eslint camelcase: "off", no-var: "off", vars-on-top: "off" */

// const { app, BrowserWindow, Menu } = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');

const store = new Store();  // eslint-disable-line

let win;
// let client_id;

app.on('ready', () => {
    // var argv = process.argv;

    // Create the browser window.
  win = new BrowserWindow({ width: 1024, height: 768 });

    // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // win.webContents.openDevTools();

    // Emitted when the window is closed.
  win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
    win = null;
  });

    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Menu.setApplicationMenu(mainMenu);

//   if (store.has('client_id')) {
//     client_id = store.get('client_id');
//   } else {
//     client_id = uuid.v4();
//     store.set('client_id', client_id);
//   }

  require('vue-devtools').install();  // eslint-disable-line
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (win === null) {
        // createWindow()
    // }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl-Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Queue',
    submenu: [
      {
        label: 'Europe Queue',
      },
      {
        label: 'USA Queue',
      },
      {
        label: 'Asia Queue',
      },
    ],
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Preferences',
      },
    ],
  },
];

if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}
