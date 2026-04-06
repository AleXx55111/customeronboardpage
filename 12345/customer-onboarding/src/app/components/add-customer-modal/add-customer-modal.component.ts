import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.css']
})
export class AddCustomerModalComponent implements OnInit {

  @Input()  editData: Customer | null = null;
  @Output() save   = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();

  showError = false;

  form: Customer = {
    firstName: '', lastName: '', role: 'Customer',
    accountBalance: 0,
    startDate: new Date().toISOString().slice(0, 10),
    accountId: ''
  };

  ngOnInit(): void {
    if (this.editData) this.form = { ...this.editData };
  }

  onSave(): void {
    if (!this.form.firstName.trim() && !this.form.lastName.trim()) {
      this.showError = true; return;
    }
    this.showError = false;
    this.save.emit({ ...this.form });
  }

  onCancel(): void { this.cancel.emit(); }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) this.cancel.emit();
  }
}
