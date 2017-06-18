import { browser } from 'protractor';

import { clearLocalStore, saveTestUserInLocalStore } from './helpers/util';

import { RegisterPage } from './page-objects/register.po';

describe('hcl-game Register page', () => {
  const testUser = {
    username: 'testUser',
    password: 'testUser112_'
  };

  let page: RegisterPage;


  beforeEach(() => {
    page = new RegisterPage();
  });

  it('Should register new user when user is not exists and navigate to play-game page', () => {
    page.navigateTo();
    browser.executeScript(clearLocalStore);
    page.setUsername(testUser.username);
    page.setPassword(testUser.password);
    page.setConfirmPassword(testUser.password);
    page.clickOnRegisterButton();
    expect(browser.getCurrentUrl()).toMatch('/play-game');
  });

  it('Should show error when username is already exists', () => {
    page.navigateTo();
    browser.executeScript(clearLocalStore);
    browser.executeScript(saveTestUserInLocalStore, testUser);
    page.setUsername(testUser.username);
    page.setPassword(testUser.password);
    page.setConfirmPassword(testUser.password);
    page.clickOnRegisterButton();
    expect(page.getAlerMsg()).toEqual('Username is already used!')
  });

});
