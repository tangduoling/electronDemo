// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const electron = require("electron");
const Menu = electron.Menu
const MenuItem = electron.MenuItem

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ show:false, width: 800, height: 400})
  //mainWindow.setMenu(null)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  //列表打开时候 再显示
  mainWindow.once('ready-to-show',()=>{
      mainWindow.show()
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){

    createWindow();

    const ctxMenu = new Menu()
    ctxMenu.append(new MenuItem({
        label:'Hello',
        click:function(){
            console.log('context menu item clicked')
        }
    }))
    ctxMenu.append(new MenuItem({role:'selectall'}))

    mainWindow.webContents.on('context-menu',function(e,param){
        ctxMenu.popup(mainWindow,param.x,param.y)
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
