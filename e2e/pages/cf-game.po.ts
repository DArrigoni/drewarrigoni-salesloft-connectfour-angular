import { browser, element, by } from 'protractor';

export class CFGamePage {
  visit() {
    return browser.get('/');
  }

  playOnColumn( column: number ) {
    const selector = `#cf-column${column}`;
    element(by.css(selector)).click();
  }

  discFor( column: number, row: number ) {
    const selector = `#cf-column${column}-row${row}`;
    const elem = element(by.css(selector));
    return elem.getAttribute('data-player');
  }
}
