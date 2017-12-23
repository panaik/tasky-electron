const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    // we could have accepted these properties as options parameter to the constructor
    super({
      height: 500,
      width: 300,
      frame: false, // this gets rid of the window's title bar with the name, close button, minimize button, etc.
      resizable: false, // do not allow the user to resize the window
      show: false, // don't show the BrowserWindow to the user..show it only after some action such as clicking on tray icon
      webPreferences: { backgroundThrottling: false }
      // setting backgroundThrottling to false, so that Chromium will not throttle or slow down the application
      // when its running in the background
      // this happens when we move focus from the Timer application to some other window,
      // so that the application runs at full speed even if its in the background
    });

    this.loadURL(url);

    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();

    // this below code was previoulsy in index.js before creating MainWindow subclass
    // blur event occurs whenever the user clicks away from the BrowserWindow
    // this is good for status bar based applications
    // mainWindow.on('blur', () => {
    //   mainWindow.hide();
    // });
  }
}

module.exports = MainWindow;
