// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow,Menu} = require('electron')
const globalShortCut = electron.globalShortCut


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ show:false, width: 800, height: 400})
  //mainWindow.setMenu(null)



  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

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
app.on('ready', createWindow)

app.on('ready',function(){
    createWindow()

        const template = [
        {
            label:'demo',
            submenu:[
                {
                    label:'submenu1',
                    click:function(){
                        console.log('clicked submenu1')
                    }
                },
                {
                    type:'separator'
                },
                {
                    label:'submenu2',
                    click:function(){
                        console.log('clicked submenu2')
                    },
                    accelerator:'CmdOrCtrl + Shift + M',
                }
            ]
        },
        {
            label:'help',
            click:function()
            {
                electron.shell.openExternal('cn.bing.com')
            },
            accelerator:'CmdOrCtrl + Shift + H',
        },
        {
            label:'Edit',
            submenu:[
                {role:'undo'},
                {role:'redo'},
                {role:'separator'},
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    globalShortCut.Register('Alt + 1',function(){
      mainWindow.show()
    });
});

app.on('will-quit',function(){
  globalShortCut.unregisterAll()
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
