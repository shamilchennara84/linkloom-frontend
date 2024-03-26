import { Component } from '@angular/core';
import {  IReportStatusRes } from '../../../core/models/interfaces/report';
import { UserService } from '../../../core/services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TableFilterComponent } from '../../common/table-filter/table-filter.component';

@Component({
  selector: 'app-admin-postreports',
  standalone: true,
  imports: [DatePipe, CommonModule, TableFilterComponent],
  templateUrl: './admin-postreports.component.html',
  styleUrl: './admin-postreports.component.css',
})
export class AdminPostreportsComponent {
  postReports: IReportStatusRes[] = []; // Assuming you have an interface for post reports
  currPage = 1;
  itemsPerPage = 10;
  searchQuery: string = '';
  postReportCount = 0;
 

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getPostReports();
  }

  getPostReports(): void {
    this.userService.getAllPostReports(this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.postReports = res.data.reports;
          this.postReportCount = res.data.reportCount;
        }
      },
    });
  }

 onAction(reportId: string): void {
 
 this.userService.ResolvePostReport(reportId).subscribe({
    next: (res: any) => { 
      
        const reportToResolve = this.postReports.find(report => report._id === reportId);

        if (reportToResolve) {
          const contentId = reportToResolve.contentId;

          this.postReports = this.postReports.map(report => {
            if (report.contentId === contentId) {
              return { ...report, isResolved: true };
            }
            return report;
          });
        }
      }
    })
 };

  

  onSearchPostReports(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.getPostReports();
  }

  onPageChange(page: number): void {
    this.currPage = page;
    this.getPostReports();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currPage = 1;
    this.getPostReports();
  }
}
