import { Injectable } from '@angular/core';
import { Transaction } from '../Models/transaction';
import { TransactionType } from '../Models/transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionParserService {

  constructor() { }

  private readonly typeMap = {
      'p' : TransactionType.Purchase,
      's' : TransactionType.Sale
    };

  public ParseTransactions(transactionsData: string[]): Transaction[] {
    if (!transactionsData || transactionsData.length === 0) {
      throw new Error('Transaction data array supplied to parser is null or empty!');
    }

    let parseFunction = this.parseUnformattedTransactionData;

    // Check if first line contains transaction column names
    const firstLine = transactionsData[0].toLowerCase();
    const delimiters = {
      type: 0,
      productName: firstLine.indexOf('product name'),
      amount: firstLine.indexOf('amount'),
      price: firstLine.indexOf('price'),
    };
    if (delimiters.productName > 0 && delimiters.amount > 0 && delimiters.price > 0) {
    // The first line contains column names, so remove it from the parse data
    transactionsData = transactionsData.slice(1);
    // Check if second line is delimeter line (=============...) and remove it from the data set
    if (this.stringIsEmptyOrWhitespace(transactionsData[0].replace('=', ''))) {
      // After replacing all '=' signs, we are left with an empty or whitespace string, so remove this from the data set
      transactionsData = transactionsData.slice(1);
    }
    // Creates an anonymous function which will include delimiter data when passing data to actual parser function.
    parseFunction = (data) => this.parseStringDelimitedTransactionData(data, delimiters);
    }


    const parsedTransactions: Transaction[] = [];
    transactionsData.forEach(data => {
      try {
        parsedTransactions.push(parseFunction(data));
      } catch (error) {
        // In a production app, this would go to an actual logging service
        console.warn('Warning. Skipping transaction which was unable to be parsed. Data: ', data);
      }
    });

    return parsedTransactions;
  }

  private parseUnformattedTransactionData(transactionData: string): Transaction {
    // This wasn't implemented due to time constraints
    // The idea was to parse a line, split it by white space, do trimming, then validate elements.
    // If the count is different than expected, search for a pair that goes together (unit + amount, amount + unit, price + currency, currency + price)
    // Afterwards, do parsing, validation, return transaction.
    throw new Error('Function Not Implemented');
  }

  private parseStringDelimitedTransactionData(transactionData: string, delimiters): Transaction {
    debugger;
    // Check for whitespace only or empty data
    if (this.stringIsEmptyOrWhitespace(transactionData)) {
     throw new Error('Parse failure, data is empty');
    }

    if (transactionData.length <= delimiters.price) {
     throw new Error('Parse failure, data is too short for largest column index!');
    }


    const transactionType = this.typeMap[transactionData[0].toLocaleLowerCase()];

    if (transactionType === undefined) {
      throw new Error('Parse failure, product type is not valid.');
    }

    const productName = transactionData.substr(delimiters.productName, delimiters.amount - delimiters.productName).trim();

    if (this.stringIsEmptyOrWhitespace(productName)) {
      throw new Error('Parse failure, product name is empty or whitespace.');
    }

    const amountString = transactionData.substr(delimiters.amount, delimiters.price - delimiters.amount).trim().toLowerCase();

    if (this.stringIsEmptyOrWhitespace(amountString)) {
      throw new Error('Parse failure, amount is empty or whitespace.');
    }

    let amountUnit = '';
    if (amountString.endsWith('kg')) {
     amountUnit = 'kg';
    } else if (amountString.endsWith('g')) {
      amountUnit = 'g';
    } else {
      throw new Error('Parse failure, could not determine amount unit');
    }

    const amount = parseFloat(amountString.replace(amountUnit, ''));
    if (isNaN(amount)) {
      throw new Error('Parse failure, amount is not a number');
    }


    let priceString = transactionData.substr(delimiters.price).trim();

    let priceCurrency = '';
    if (isNaN(parseInt(priceString[0], 10))) {
      priceCurrency = priceString[0];
      priceString = priceString.substr(1);
    } else if (isNaN(parseInt(priceString[priceString.length - 1], 10))) {
      priceCurrency = priceString[priceString.length - 1];
      priceString = priceString.substr(0, priceString.length - 1);
    } else {
      throw new Error('Parse failure, could not determine price currency');
    }

    const priceAmount = parseFloat(priceString);
    if (isNaN(priceAmount)) {
      throw new Error('Parse failure, could not determine price amount');
    }


    return new Transaction(transactionType, productName, amount, amountUnit, priceCurrency, priceAmount);
    }


  private stringIsEmptyOrWhitespace(string: string): boolean {
    return !/\S/.test(string);
  }
}
