import { Component, OnInit, computed, signal } from '@angular/core';
import { UserSidenavComponent } from '../user-sidenav/UserSidenavComponent';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserRes } from '../../../core/models/interfaces/users';
import { LoaderComponent } from '../../common/loader/loader.component';
import { LoaderService } from '../../../core/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    UserSidenavComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {
  collapsed = signal(true);
  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
  userDetails$!: Observable<IUserRes | null>;
  showLoader$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
    this.loaderService.showLoader();
    this.showLoader$ = this.loaderService.loadingAction$;

    this.showLoader$.subscribe((show) => {
      console.log('Loader visibility:', show);
    });

    setTimeout(() => {
      console.log('Hiding loader after 2 seconds');
      this.loaderService.hideLoader();
    }, 500);
  }
}
