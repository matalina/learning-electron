const electron = require('electron');
const { app, BrowserWindow } = electron;


class MainWindow extends BrowserWindow {
    constructor(options, path) {
        super(options);

        this.loadURL(path);
        this.on('closed', this.onClose.bind(this));
        // status bar based app
        // this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.hide();
    }

    onClose() {
        app.quit();
    }
}

module.exports = MainWindow;