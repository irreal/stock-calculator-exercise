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

    constructor(public type: TransactionType, public product: string, public amount: number, public unit: string, public price: number) {
        if (this.amount < 0) {
            throw new Error('Invalid amount supplied. Amount for purchase or sale must be positive');
        }

        // TODO: Check if negative price is allowed

        this.unit = this.unit.toLocaleLowerCase();
        if (!this.allowedUnits.includes(this.unit)) {
            throw new Error(`Invalid unit supplied. ${this.unit} is not a valid unit.`);
        }
    }
}
