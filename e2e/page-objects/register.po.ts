import { browser, by, element } from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/register');
  }

  setUsername(email: string) {
    return element(by.css('app-bs-input[controlname="username"] input')).sendKeys(email);
  }

  setPassword(password: string) {
    return element(by.css('app-bs-input[controlname="password"] input')).sendKeys(password);
  }

  setConfirmPassword(password: string) {
    return element(by.css('app-bs-input[controlname="confirmPassword"] input')).sendKeys(password);
  }

  getAlerMsg() {
    return element(by.css('div.alert')).getText();

  }

  clickOnRegisterButton() {
    return element(by.css('button[type="submit"]')).click();
  }

}
