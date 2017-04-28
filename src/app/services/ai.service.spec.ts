import { TestBed, inject, async } from '@angular/core/testing';
import { Http } from '@angular/http';

import { AiService } from './ai.service';

describe('AiService', () => {
  const exampleResponseData = '2';
  const exampleResponse = {
    json: () => {
      return JSON.parse(exampleResponseData);
    }
  }

  const stubResponse = {
    toPromise: () => {
      return Promise.resolve(exampleResponse);
    }
  }

  const stubHttp = {
    put: (url, params) => {
      return stubResponse;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Http, useValue: stubHttp },
        AiService
      ]
    });

  });

  it('should exist', inject([AiService], (service: AiService) => {
    expect(service).toBeTruthy();
  }));

  describe('#random', () => {
    it('should call the correct url and parameters and unwrap the json', async(inject([AiService], (service: AiService) => {
      spyOn(stubHttp, 'put');

      service.random('aGameState', 'anActivePlayer').then((colToPlay) => {
        expect(colToPlay).toEqual(2);
      });
    })));
  })

});
