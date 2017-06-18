import { browser } from 'protractor';

import { clearLocalStore, getGameFromLocalStore, saveUserInLocalStore } from './helpers/util';
import { PlayGamePage } from './page-objects/play-game.po';
import { Game } from '../src/app/models/game.model';

describe('hcl-game Play Game', () => {
  const testUser = {
    username: 'testUser',
    password: 'testUser112_'
  };

  let page: PlayGamePage;


  beforeEach(() => {
    page = new PlayGamePage();
    page.navigateTo();
    browser.executeScript(clearLocalStore);
    browser.executeScript(saveUserInLocalStore, testUser);
    page.navigateTo();
  });

  it('Should redirect to login page when not exist logged in user', () => {
    browser.executeScript(clearLocalStore);
    page.navigateTo();
    expect(browser.getCurrentUrl()).toMatch('/login');
  });

  it('Should play the game on win path and start new game', () => {
    page.clickOnStartNewGameButton();
    browser.executeScript(getGameFromLocalStore)
      .then((game: Game) => {
        page.setTip(game.theNumber);
        page.clickOnGuessButton();
        expect(page.getWinGameText()).toEqual('Good Guess!!!');

        page.clickOnStartNewGameButton();
        expect(page.getH1Text()).toEqual('Let\'s play');
      })
  });

  it('Should play the game on error path and start new game', () => {
    page.clickOnStartNewGameButton();
    browser.executeScript(getGameFromLocalStore)
      .then((game: Game) => {
        const wrongTip = game.theNumber + 1;
        page.setTip(wrongTip);
        page.clickOnGuessButton();
        expect(page.getAlerMsg()).toEqual('Remaining tries: 2');

        page.clickOnGuessButton();
        expect(page.getAlerMsg()).toEqual('Remaining tries: 1');

        page.clickOnGuessButton();
        expect(page.getGameOverText()).toEqual('I am sorry!!!');

        page.clickOnStartNewGameButton();
        expect(page.getH1Text()).toEqual('Let\'s play');

      })
  })

});
