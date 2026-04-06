// ============================================
// customer.service.ts — Business Logic / State
// ============================================
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private _customers = new BehaviorSubject<Customer[]>([
    { id: 'ACC-00101', firstName: 'Lili',      lastName: 'Daniels',  role: 'Customer', accountBalance: 190000, startDate: '2021-06-01', accountId: 'ACC-00101' },
    { id: 'ACC-00102', firstName: 'Henrietta', lastName: 'Whitney',  role: 'Customer', accountBalance: 130000, startDate: '2022-08-04', accountId: 'ACC-00102' },
    { id: 'ACC-00103', firstName: 'Seth',      lastName: 'McDaniel', role: 'Customer', accountBalance: 175000, startDate: '2019-09-22', accountId: 'ACC-00103' },
    { id: 'ACC-00104', firstName: 'Edward',    lastName: 'King',     role: 'Customer', accountBalance: 250000, startDate: '2020-02-15', accountId: 'ACC-00104' },
  ]);

  customers$: Observable<Customer[]> = this._customers.asObservable();

  get customers(): Customer[] {
    return this._customers.getValue();
  }

  add(customer: Customer): void {
    const next = [
      ...this.customers,
      { ...customer, id: this.generateId(), accountId: this.generateId() }
    ];
    this._customers.next(next);
  }

  update(index: number, customer: Customer): void {
    const updated = [...this.customers];
    updated[index] = customer;
    this._customers.next(updated);
  }

  remove(index: number): void {
    const updated = [...this.customers];
    updated.splice(index, 1);
    this._customers.next(updated);
  }

  search(query: string): Customer[] {
    const q = query.toLowerCase();
    return this.customers.filter(c =>
      !q ||
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q)  ||
      (c.accountId || '').toLowerCase().includes(q)
    );
  }

  sortBy(key: keyof Customer, asc: boolean): void {
    const sorted = [...this.customers].sort((a, b) => {
      const va = a[key] as string | number;
      const vb = b[key] as string | number;
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1  : -1;
      return 0;
    });
    this._customers.next(sorted);
  }

  private generateId(): string {
    return 'ACC-' + Math.floor(10000 + Math.random() * 90000);
  }

  formatBalance(value: number): string {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2 });
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${m}/${d}/${y}`;
  }
}
