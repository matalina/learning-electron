const electron = require('electron');
const path = require('path');
const NewTray = './app/NewTray';

const { app, BrowserWindow, ipcMain, Menu } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // width: 300,
        // height: 200,
        // title: 'Title here',
        // frame: false, // no window chrome
        // resizable: false, // no resize option
        // show: false, // do not show at startup
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed',() => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    const iconName = process.platform === 'win32' ? 'windows_filename.png' : 'filename.png';
    const iconPath = path.join(__dirname,`./path/location/${iconName}`);
    tray = new NewTray(iconPath);
});

// when adding new windows
// newWindow.on('closed', () => newWindow = null);

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// iOSX menu fix
if(process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Development',
        submenu: [
            {
                role: 'reload',
            },
            {
                label: 'Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'F12',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}
