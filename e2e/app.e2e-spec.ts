import { browser } from 'protractor';

import { clearLocalStore, saveUserInLocalStore} from './helpers/util';

import { HclGamePage } from './page-objects/app.po';

describe('hcl-game App', () => {
  const testUser = {
    username: 'testUser',
    password: 'testUser112_'
  };

  let page: HclGamePage;


  beforeEach(() => {
    page = new HclGamePage();
  });

  it('Should navigate to login page when localStore user is not exists', () => {
    page.navigateTo();
    browser.executeScript(clearLocalStore)
      .then(() => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toMatch('/login');
      })
  });

  it('Should navigate to play-game page when localstore user is exists', () => {
    page.navigateTo();
    browser.executeScript(saveUserInLocalStore, testUser)
      .then(() => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toMatch('/play-game');
      })
  })
});
