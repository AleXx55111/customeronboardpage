import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';

interface Toast { msg: string; err?: boolean; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, CustomerTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toasts: Toast[] = [];

  showToast(t: Toast): void {
    this.toasts.push(t);
    setTimeout(() => this.toasts.shift(), 2800);
  }

  onLogout(): void {
    this.showToast({ msg: 'Logged out successfully' });
  }
}
