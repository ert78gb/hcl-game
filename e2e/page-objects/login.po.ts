import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  setUsername(email: string) {
    return element(by.css('app-bs-input[controlname="username"] input')).sendKeys(email);
  }

  setPassword(password: string) {
    return element(by.css('app-bs-input[controlname="password"] input')).sendKeys(password);
  }

  getAlerMsg() {
    return element(by.css('div.alert')).getText();

  }

  clickOnLoginButton() {
    return element(by.css('button[type="submit"]')).click();
  }

  clickOnRegisterLink() {
    return element(by.css('button.btn.btn-link')).click();
  }
}
