import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { AddCustomerModalComponent } from '../add-customer-modal/add-customer-modal.component';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [FormsModule, AddCustomerModalComponent],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  @Output() toast = new EventEmitter<{ msg: string; err?: boolean }>();

  displayedCustomers: Customer[] = [];
  searchQuery = '';
  showModal   = false;
  editingCustomer: Customer | null = null;
  editingIndex: number | null = null;

  private sortKey: keyof Customer = 'firstName';
  private sortAsc = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.customers$.subscribe(customers => {
      this.displayedCustomers = this.applySearch(customers);
    });
  }

  onSearchChange(): void {
    this.displayedCustomers = this.applySearch(this.customerService.customers);
  }

  private applySearch(list: Customer[]): Customer[] {
    const q = this.searchQuery.toLowerCase();
    return list.filter(c =>
      !q ||
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q)  ||
      (c.accountId || '').toLowerCase().includes(q)
    );
  }

  sort(key: keyof Customer): void {
    if (this.sortKey === key) this.sortAsc = !this.sortAsc;
    else { this.sortKey = key; this.sortAsc = true; }
    this.customerService.sortBy(key, this.sortAsc);
  }

  getSortIcon(key: keyof Customer): string {
    if (this.sortKey !== key) return '↕';
    return this.sortAsc ? '↑' : '↓';
  }

  onDateChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const updated = { ...this.customerService.customers[index], startDate: value };
    this.customerService.update(index, updated);
    this.toast.emit({ msg: 'Date updated' });
  }

  onEdit(index: number): void {
    this.editingIndex    = index;
    this.editingCustomer = { ...this.customerService.customers[index] };
    this.showModal       = true;
  }

  onDelete(index: number): void {
    const c = this.customerService.customers[index];
    this.customerService.remove(index);
    this.toast.emit({ msg: `${c.firstName} ${c.lastName} removed` });
  }

  openAddModal(): void {
    this.editingCustomer = null;
    this.editingIndex    = null;
    this.showModal       = true;
  }

  closeModal(): void { this.showModal = false; }

  onModalSave(customer: Customer): void {
    if (this.editingIndex !== null) {
      this.customerService.update(this.editingIndex, customer);
      this.toast.emit({ msg: `${customer.firstName} ${customer.lastName} updated` });
    } else {
      this.customerService.add(customer);
      this.toast.emit({ msg: `${customer.firstName} ${customer.lastName} added` });
    }
    this.closeModal();
  }

  formatBalance(value: number): string {
    return this.customerService.formatBalance(value);
  }
}
