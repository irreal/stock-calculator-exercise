import { TestBed, async } from '@angular/core/testing';
import { Transaction } from './transaction';
import { TransactionType } from './transaction-type.enum';

describe('Transaction', () => {

  it('should create a transaction', () => {
    let transaction = new Transaction(TransactionType.Purchase, 'Product 1', 1, 'kg', '$', 1);
    expect(transaction).toBeTruthy();
    transaction = new Transaction(TransactionType.Sale, 'Product 1', 1, 'g', '$', 1);
    expect(transaction).toBeTruthy();
  });

  it('should return amount in grams', () => {
    let transaction = new Transaction(TransactionType.Purchase, 'Product 1', 1, 'kg', '$', 1);
    expect(transaction.AmountInGrams).toEqual(1000);
    transaction = new Transaction(TransactionType.Sale, 'Product 1', 1, 'g', '$', 1);
    expect(transaction.AmountInGrams).toEqual(1);
  });

  it('should return price in cents', () => {
    let transaction = new Transaction(TransactionType.Purchase, 'Product 1', 1, 'kg', '$', 1);
    expect(transaction.PriceInCents).toEqual(100);
    transaction = new Transaction(TransactionType.Sale, 'Product 1', 1, 'g', '$', 5);
    expect(transaction.PriceInCents).toEqual(500);
  });

  it('should reject negative amounts', () => {
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, 'Product 1', -5, 'kg', '$',  1);
    }).toThrowError();
  });

  it('should reject invalid units', () => {
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, 'Product 1', -5, 'not a valid unit', '$', 1);
    }).toThrowError();
  });

  it('should reject missing properties', () => {
    expect(() => {
      const transaction = new Transaction(null, 'Product 1', -5, 'not a valid unit', '$', 1);
    }).toThrowError();
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, null, -5, 'not a valid unit', '$', 1);
    }).toThrowError();
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, 'Product 1', null, 'not a valid unit', '$', 1);
    }).toThrowError();
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, 'Product 1', -5, null, '$', 1);
    }).toThrowError();
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, 'Product 1', -5, 'not a valid unit', '$', null);
    }).toThrowError();
    expect(() => {
      const transaction = new Transaction(TransactionType.Purchase, 'Product 1', -5, 'not a valid unit', null, 1);
    }).toThrowError();
  });
});
