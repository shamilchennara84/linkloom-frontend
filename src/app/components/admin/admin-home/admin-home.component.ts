import { Component } from '@angular/core';
import { LineGraphComponent } from '../../common/line-graph/line-graph.component';
import { BarGraphComponent } from '../../common/bar-graph/bar-graph.component';
import { ReportCardComponent } from '../../common/report-card/report-card.component';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { adminCardData } from '../../../core/models/interfaces/admin';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [LineGraphComponent, BarGraphComponent, ReportCardComponent, CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  usersSVG: string = `https://cdn-icons-png.flaticon.com/128/1256/1256650.png`;
  postSVG: string = `https://cdn-icons-png.flaticon.com/128/8307/8307423.png`;
  reportsSVG: string = `https://cdn-icons-png.flaticon.com/128/8479/8479683.png`;
  deleteUserSVG: string = `https://cdn-icons-png.flaticon.com/128/2444/2444442.png`;
  adminCardData$: Observable<adminCardData | null>;

  constructor(private userService: UserService) {
    this.adminCardData$ = this.userService.getAdminCardData().pipe(map((response) => response.data));
  }
}
