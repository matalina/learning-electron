const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, ipcMain, Menu, Tray } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // width: 300,
        // height: 200,
        // title: 'Title here',
        // frame: false, // no window chrome
        // resizable: false, // no resize option
        //
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed',() => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    const iconName = process.platform === 'win32' ? 'windows_filename.png' : 'filename.png';
    const iconPath = path.join(__dirname,`./path/location/${iconName}`);
    new Tray(iconPath);
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
