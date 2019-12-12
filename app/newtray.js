const electron = require('electron');
const path = require('path');

const { Tray } = electron;

class NewTray extends Tray {
  constructor(path) {
    super(path);
  } 
};

moduels.export = NewTray;
