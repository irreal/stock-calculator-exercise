import { TransactionType } from './transaction-type.enum';

export class Transaction {
    public get AmountInGrams(): number {
        if (this.unit.toLowerCase() === 'kg') {
            return (this.amount * 1000);
        } else if (this.unit.toLocaleLowerCase() === 'g') {
        return this.amount;
        }
    }

    public get PriceInCents(): number {
        return Math.round(this.price * 100);
    }

    private readonly allowedUnits: string[] = ['kg', 'g'];

    constructor(public type: TransactionType, public product: string, public amount: number, public unit: string, public currency: string, public price: number) {
        this.validateTransactionData();
    }

    private validateTransactionData() {

        if (this.type === null || this.type === undefined) {
            throw new Error('No type supplied. Transaction type is required');
        }
        if (!this.product) {
            throw new Error('No product supplied. Product name is required');
        }

        if (this.currency === null || this.currency === undefined) {
            throw new Error('No currencty supplied. Currency is required');
        }

        if (!this.amount || this.amount < 0) {
            throw new Error('Invalid amount supplied. Amount must be declared and its value must be positive');
        }

        this.unit = this.unit.toLocaleLowerCase();
        if (!this.allowedUnits.includes(this.unit)) {
            throw new Error(`Invalid unit supplied. ${this.unit} is not a valid unit.`);
        }

        // TODO: Check if negative price is allowed
        if (this.price === null || this.price === undefined) {
            throw new Error(`Invalid price supplied. Price is required.`);
        }
    }
}
