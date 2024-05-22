import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private _authService = inject(AuthService);
  user = computed(() => this._authService.currentUser());


/*   get user() {
    return this._authService.currentUser();
  }
 */

  logout() {
    this._authService.logout();
    }
}
