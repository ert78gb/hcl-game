import { browser } from 'protractor';

import { clearLocalStore, saveTestUserInLocalStore } from './helpers/util';

import { LoginPage } from './page-objects/login.po';

describe('hcl-game App', () => {
  const testUser = {
    username: 'testUser',
    password: 'testUser112_'
  };

  let page: LoginPage;


  beforeEach(() => {
    page = new LoginPage();
  });

  it('Should login when user data is correct', () => {
    page.navigateTo();
    browser.executeScript(clearLocalStore);
    browser.executeScript(saveTestUserInLocalStore, testUser);
    page.setUsername(testUser.username);
    page.setPassword(testUser.password);
    page.clickOnLoginButton();
    expect(browser.getCurrentUrl()).toMatch('/play-game');
  });

  it('Should navigate to play-game page when localstore user is exists', () => {
    page.navigateTo();
    browser.executeScript(clearLocalStore);
    page.setUsername(testUser.username);
    page.setPassword(testUser.password);
    page.clickOnLoginButton();
    expect(page.getAlerMsg()).toEqual('Wrong username or password')
  });

  it('Should navigate to register page when click on register link', () => {
    page.navigateTo();
    page.clickOnRegisterLink();
    expect(browser.getCurrentUrl()).toMatch('/register');
  })
});
