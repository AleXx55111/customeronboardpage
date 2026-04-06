// ============================================
// customer.model.ts — Data Model
// ============================================

export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  role: 'Customer' | 'Manager' | 'Admin';
  accountBalance: number;
  startDate: string;   // ISO format: YYYY-MM-DD
  accountId?: string;
}

export interface NavGroup {
  label: string;
  icon: string;
  open: boolean;
  active: boolean;
  items: NavItem[];
}

export interface NavItem {
  label: string;
  route: string;
  active: boolean;
}
