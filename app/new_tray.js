const electron = require('electron');

const { app, Tray, Menu } = electron;

class New_tray extends Tray {
  constructor(path, mainWindow) {
    super(path);
    this.mainWindow = mainWindow;
    
    this.setToolTip('New Tray');
    
    this.on('click', this.onClick);
    this.on('right-click', this.onRightClick.bind(this));
  } 
  
  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    const yPosition = process.platform === 'darwin' ? y : y - height;
    if(this.mainWindow.isVisible()) {
        this.mainWindow.hide();
    }
    else {
        // position near tray icon
        /*this.mainWindow.setBounds({
            x: x - width / 2,
            y: yPosition,
            height,
            width,
        });*/
        this.mainWindow.show();
    }
  }

  onRightClick(event, bounds) {
      const menuConfig = Menu.buildFromTemplate([
          {
              label: 'Quit',
              accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+Q',
              click() {
                  app.quit();
              }
          }
      ]);

      this.popUpContextMenu(menuConfig);
  }
}

module.exports = New_tray;
