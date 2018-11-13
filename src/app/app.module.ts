import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransactionParserService } from './Services/transaction-parser.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [TransactionParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
