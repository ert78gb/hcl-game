import { browser, by, element } from 'protractor';

export class HclGamePage {
  navigateTo() {
    return browser.get('/');
  }
}
