const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    // setToolTip is method from Tray base class
    this.setToolTip('Timer App'); // this text will appear when you hover over the app Tray icon

    // TimerTray object will have access to '.on' method provided by Tray class
    this.on('click', this.onClick.bind(this));

    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    // console.log(bounds.x, bounds.y);
    // Click event bounds
    const { x, y } = bounds;

    // Window height and width, i.e., get its X and Y direction bounds
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      //  for OSX the window is at the top, while for windows the window is at the bottom right
      const yPosition = process.platform === 'darwin' ? y : y - height;

      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    // popUpContextMenu is a method from base Tray class
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
