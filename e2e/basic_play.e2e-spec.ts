import { CFGamePage } from './pages/cf-game.po';

//IDEA: Refactor into Gherkin? Cucumber?

describe('Basic Play', () => {
  let gamePage: CFGamePage;

  const PLAYER1 = 1;

  beforeEach(() => { gamePage = new CFGamePage(); });

  it('should allow me to place a disc on an empty board', () => {
    //Given I have a active game
    gamePage.visit();

    //When I add a disc to column 4
    gamePage.playOnColumn(4);

    //Then my disc should be on column 4, row 1
    expect(gamePage.discFor(4, 1)).toEqual(String(PLAYER1));
  });

  it('should allow me to place a disc on top of another disc', ()=> {
    //Given I have a active game
    gamePage.visit();

    //And there is a disc in column 4, row 1
    gamePage.playOnColumn(4);

    //When I add a disc to column 4
    gamePage.playOnColumn(4);

    //Then my disc should be on column 4, row 2
    expect(gamePage.discFor(4, 2)).toEqual(String(PLAYER1));
  });
});
