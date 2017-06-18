import { browser, by, element } from 'protractor';

export class PlayGamePage {
  navigateTo() {
    return browser.get('/play-game');
  }

  getH1Text() {
    return element(by.css('h1')).getText();
  }

  setTip(tip: number) {
    return element(by.css('app-bs-input[controlname="tip"] input')).sendKeys(tip);
  }

  getAlerMsg() {
    return element(by.css('div.alert')).getText();

  }

  getWinGameText() {
    return element(by.css('app-win-game div p:first-child')).getText();
  }

  getGameOverText() {
    return element(by.css('app-game-over div p:first-child')).getText();
  }

  clickOnStartNewGameButton() {
    return element(by.id('startNewGame')).click();
  }

  clickOnGuessButton() {
    return element(by.id('guess')).click();
  }
}
