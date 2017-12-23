const path = require('path'); // path abstracts out difference between OSX and Windows OS file systems
const electron = require('electron');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  app.dock.hide(); // this method call will hide the electron app icon that shows up in the dock at the bottom

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
  // mainWindow.loadURL(`file://${__dirname}/src/index.html`); // moved this line into MainWindow subclass

  // no need to specify '@2x' in the image name, electron will select the preferred resolution icon
  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new TimerTray(iconPath, mainWindow);

  // new TimerTray(iconPath, mainWindow);
  // If you do not have "let tray = new TimerTray()", then since there is no reference to TimerTray,
  // it will be garbage collected and the Tray icon will disappear after some time of no use
  // Hence we need to add a reference to TimerTray by defining let tray = new TimerTray()
});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft); // this text of timeLeft will show up next to the Tray icon in the status bar
});
