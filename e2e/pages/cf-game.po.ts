import { browser, element, by } from 'protractor';

export class CFGamePage {
  visit() {
    return browser.get('/');
  }

  playOnColumn( column: number ) {
    let selector = `#cf-column${column}`
    element(by.css(selector)).click();
  }

  discFor( column: number, row: number ) {
    let selector = `#cf-column${column}-row${row}`
    let elem = element(by.css(selector))
    return elem.getAttribute('data-player')
  }
}
