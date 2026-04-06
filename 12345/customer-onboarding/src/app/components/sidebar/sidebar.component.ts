import { Component, EventEmitter, Output } from '@angular/core';
import { NavGroup, NavItem } from '../../models/customer.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() logout = new EventEmitter<void>();

  navGroups: NavGroup[] = [
    {
      label: 'Customer Onboarding', icon: '📋', open: true, active: true,
      items: [
        { label: 'Create Customer',  route: '/create-customer',  active: false },
        { label: 'Create Accounts',  route: '/create-accounts',  active: false },
        { label: 'Create Contracts', route: '/create-contracts', active: true  },
      ]
    },
    {
      label: 'Customer Management', icon: '👥', open: false, active: false,
      items: [
        { label: 'View Customer', route: '/view-customer', active: false },
        { label: 'View Accounts', route: '/view-accounts', active: false },
      ]
    }
  ];

  toggleGroup(group: NavGroup): void {
    group.open   = !group.open;
    group.active = group.open;
  }

  activateItem(group: NavGroup, selected: NavItem): void {
    this.navGroups.forEach(g => g.items.forEach(i => (i.active = false)));
    selected.active = true;
    this.navGroups.forEach(g => (g.active = false));
    group.active = true;
  }

  onLogout(): void { this.logout.emit(); }
}
