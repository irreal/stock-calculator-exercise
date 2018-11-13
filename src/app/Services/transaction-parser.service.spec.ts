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
      'P Pear                          18036 g        15.48$'
    ];

    expect(service.ParseTransactions(data).length).toEqual(1);

  });
});
