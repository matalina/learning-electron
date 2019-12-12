const electron = require('electron');
const path = require('path');

const { Tray } = electron;

class NewTray extends Tray {
  constructor(path, mainWindow) {
    super(path);
    this.mainWindow = mainWindow;
    
    this.setToolTip('New Tray');
    
    this.on('click', this.onClick);
    this.on('right-click', this.onRightClick.bind(this);
  } 
  
  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    const yPosition = process.platform === 'darwin': y ? y - height;
    if(this.mainWindow.isVisible()) {
        this.mainWindow.hide();
    }
    else {
        this.mainWindow.setBounds({
            x: x - width / 2,
            y: y ,
            height,
            width,
        });
        this.mainWindow.show();
    }
  }

  onRightClick(event, bounds) {
    
  }
};

moduels.export = NewTray;
