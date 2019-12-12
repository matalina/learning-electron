const electron = require('electron');
const path = require('path');
const NewTray = require('./app/new_tray');
const MainWindow = require('./app/main_window');

const { app, ipcMain, Menu } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new MainWindow({
        // width: 300,
        // height: 200,
        // title: 'Title here',
        // frame: false, // no window chrome
        // resizable: false, // no resize option
        // show: false, // do not show at startup
        // webPreferences: {
        //     backgroundThrottling: false, // run scripts in background
        // }
    }, `file://${__dirname}/main.html`);

    // if not needed in task bar
    /*if(process.platform === 'darwin') {
        app.dock.hide();
    }
    else {
        mainWindow.setSkipTaskbar(true);
    }*/

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    const iconName = process.platform === 'win32' ? 'icon-background.png' : 'icon-transparent.png';
    const iconPath = path.join(__dirname,`./assets/images/${iconName}`);
    tray = new NewTray(iconPath, mainWindow);
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
