import { HclGamePage } from './app.po';

describe('hcl-game App', () => {
  let page: HclGamePage;

  beforeEach(() => {
    page = new HclGamePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
