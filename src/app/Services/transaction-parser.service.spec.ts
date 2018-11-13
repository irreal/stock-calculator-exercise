import { TestBed } from '@angular/core/testing';

import { TransactionParserService } from './transaction-parser.service';

describe('TransactionParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionParserService = TestBed.get(TransactionParserService);
    expect(service).toBeTruthy();
  });
  it('should parse transactions', () => {
    const service: TransactionParserService = TestBed.get(TransactionParserService);

    const data = [
      '  Product name                  Amount         Price (per kg)',
      '==================================================================',
      'P Pear                          18036 g        15.48$',
      'S Pear                          339  g         $19.26',
      'P Apple (red)                   1130g          $6',
      'P Watermelon (2nd class)        14835  g       $ 13.87',
      'P banana                        17188g         20.43$',
      'S Pear                          979g           $21.8',
      'S Pear                          278g           18.13$',
      'S Watermelon (2nd class)        1701 g         16.4 $',
      'S Banana                        1.578 kg       $ 24.39',
      'S Watermelon (2nd class)        1.73 kg        $20.1',
      'P Apple (green)                 18.998 kg      $12.4',
      'P Watermelon (2nd class)        19139 g        15$',
      'S Banana                        1.738kg        $ 19.37'
    ];

    expect(service.ParseTransactions(data).length).toEqual(13);
  });
});
