import { Component } from '@angular/core';
import { TransactionParserService } from './Services/transaction-parser.service';
import { Transaction } from './Models/transaction';
import { Total } from './Models/total';
import { HttpClient } from '@angular/common/http';
import { TransactionType } from './Models/transaction-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sourceUrl = 'https://c-test-01.glitch.me/data.txt';
  public loading = false;
  public totals: Total[] = [];

  constructor(
    private httpClient: HttpClient,
    private transactionParser: TransactionParserService
  ) {}

  public parseData() {
    this.loading = true;
    this.httpClient.get(this.sourceUrl, { responseType: 'text' }).subscribe(
      data => {
        const lines = data.match(/[^\r\n]+/g);
        const transactions = this.transactionParser.ParseTransactions(lines);

        this.totals = this.calculateTotals(transactions);
      },
      error => {
        console.log('error loading data: ', error);
      },
      () => {
        this.loading = false;
      }
    );
  }
  private calculateTotals(transactions: Transaction[]): Total[] {
    const productTotals = {};

    transactions.forEach(t => {
      const total: Total = productTotals[t.product];
      if (total === undefined) {
        productTotals[t.product] = new Total(
          t.product,
          t.type === TransactionType.Purchase
            ? t.AmountInGrams
            : -t.AmountInGrams,
          t.type === TransactionType.Purchase
            ? -t.PriceInCents * (t.AmountInGrams / 1000)
            : t.PriceInCents * (t.AmountInGrams / 1000),
          t.currency
        );
        return;
      }

      total.balanceInCents +=
        t.type === TransactionType.Purchase
          ? -t.PriceInCents * (t.AmountInGrams / 1000)
          : t.PriceInCents * (t.AmountInGrams / 1000);
      total.amountInStockInGrams +=
        t.type === TransactionType.Purchase
          ? t.AmountInGrams
          : -t.AmountInGrams;
    });

    const totals: Total[] = [];
    Object.keys(productTotals).forEach(k => {
      totals.push(productTotals[k] as Total);
    });
    return totals;
  }
  public getTotalBalance() {
    if (!this.totals || this.totals.length === 0)  {
      return '';
    }
    return this.totals[0].currency + ' ' + (this.totals.reduce((sum, t) => sum + t.balanceInCents, 0) / 100).toFixed(2);
  }
}
