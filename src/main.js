const electron = require('electron')
const countdown = require('./countdown.js')
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain
const windows = []
app.on('ready', _ => {
    [1, 2, 3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400
        })
        win.loadURL(`file://${__dirname}/countdown.html`)

        win.on('closed', _ => {
            console.log('closed')
            mainWindow = null
        })
        ipc.on('countdown-start', _ => {
            countdown(count => {
                win.webContents.send('countdown', count)
            })
        })
    })
})