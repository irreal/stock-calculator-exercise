import { Component } from '@angular/core';
import { TransactionParserService } from './Services/transaction-parser.service';
import { Transaction } from './Models/transaction';
import { HttpClient } from '@angular/common/http';
import { TransactionType } from './Models/transaction-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public sourceUrl = 'https://c-test-01.glitch.me/data.txt';
  public totals: Total[] = [];


  constructor(private httpClient: HttpClient, private transactionParser: TransactionParserService) {
  }

  public parseData() {
    this.httpClient.get(this.sourceUrl, { responseType: 'text' }).subscribe(data => {

      const lines = data.match(/[^\r\n]+/g);
      const transactions = this.transactionParser.ParseTransactions(lines);

      const productTotals = {};

      transactions.forEach(t => {
        const total: Total = productTotals[t.product];
        if (total === undefined) {
          productTotals[t.product] =  new Total(
            t.product,
            t.type === TransactionType.Purchase ? t.AmountInGrams : -t.AmountInGrams,
            t.type === TransactionType.Purchase ? -t.PriceInCents * (t.AmountInGrams / 1000) : t.PriceInCents * (t.AmountInGrams / 1000),
            t.currency
            );
          return;
      }

      total.balanceInCents += t.type === TransactionType.Purchase ? -t.PriceInCents * (t.AmountInGrams / 1000) : t.PriceInCents * (t.AmountInGrams / 1000);
      total.amountInStockInGrams += t.type === TransactionType.Purchase ? t.AmountInGrams : -t.AmountInGrams;
    });

    const totals: Total[] = [];
    Object.keys(productTotals).forEach(k => {
      totals.push(productTotals[k] as Total);
    });

    this.totals = totals;
    });
  }

}

class Total {
  constructor(
  public productName: string,
  public amountInStockInGrams: number,
  public balanceInCents: number,
  public currency: string) {}
}
