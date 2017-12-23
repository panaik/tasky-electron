// Old index.js, before adding ES6 Class for TimerTray and MainWindow

const path = require('path'); // path abstracts out difference between OSX and Windows OS file systems
const electron = require('electron');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false, // this gets rid of the window's title bar with the name, close button, minimize button, etc.
    resizable: false, // do not allow the user to resize the window
    show: false // don't show the BrowserWindow to the user..show it only after some action such as clicking on tray icon
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // no need to specify '@2x' in the image name, electron will select the preferred resolution icon
  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);

  tray.on('click', (event, bounds) => {
    // console.log(bounds.x, bounds.y);
    // Click event bounds
    const { x, y } = bounds;

    // Window height and width, i.e., get its X and Y direction bounds
    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      //  for OSX the window is at the top, while for windows the window is at the bottom right
      const yPosition = process.platform === 'darwin' ? y : y - height;

      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width
      });
      mainWindow.show();
    }
  });
});
