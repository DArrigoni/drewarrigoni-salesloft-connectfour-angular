import { DrewarrigoniSalesloftConnectfourAngularPage } from './app.po';

describe('drewarrigoni-salesloft-connectfour-angular App', () => {
  let page: DrewarrigoniSalesloftConnectfourAngularPage;

  beforeEach(() => {
    page = new DrewarrigoniSalesloftConnectfourAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
