import { Component } from '@angular/core';
import { TransactionParserService } from './Services/transaction-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-calculator';
  constructor(private transactionParser: TransactionParserService) {
    console.log('jeeej', this.transactionParser);
  }
}
