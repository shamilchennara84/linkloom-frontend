import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { UserService } from '../../../core/services/user.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IApiRes } from '../../../core/models/interfaces/common';
import { IUserPerMonth, IUserPerYear } from '../../../core/models/interfaces/users';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css',
})
export class LineGraphComponent implements OnInit, OnDestroy {
  chart!: Chart;
  showYearlyData = false;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {} // Inject the service to fetch user data

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const dataFetcher = this.showYearlyData
      ? (this.userService.getNewActiveUsersPerYear() as Observable<IApiRes<IUserPerYear[] | null>>)
      : (this.userService.getNewActiveUsersPerMonth() as Observable<IApiRes<IUserPerMonth[]>>);

    if (this.showYearlyData) {
            (dataFetcher as Observable<IApiRes<IUserPerYear[] | null>>)
              .pipe(takeUntil(this.destroy$))
              .subscribe((response: IApiRes<IUserPerYear[] | null>) => {
                if (response.data) {
                  const chartData = response.data.map((item) => [Date.parse(item.year), item.count]) as [
                    number,
                    number
                  ][];
                  this.updateChart(chartData);
                }
              });
    } else {
            (dataFetcher as Observable<IApiRes<IUserPerMonth[]>>)
              .pipe(takeUntil(this.destroy$))
              .subscribe((response: IApiRes<IUserPerMonth[]>) => {
                const chartData = response.data.map((item) => [Date.parse(item.month), item.count]) as [
                  number,
                  number
                ][];
                this.updateChart(chartData);
              });
    }
  }

  updateChart(chartData: [number, number][]) {
    console.log(chartData);
    this.chart = new Chart({
      chart: {
        type: 'line',
        width: 700,
        backgroundColor: '#111111',
      },
      title: {
        text: this.showYearlyData ? 'New Active Users Per Year' : 'New Active Users Per Month',
        style: {
          color: '#FFFFFF',
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: '#ED0B51',
          },
          format: this.showYearlyData ? '{value:%Y}' : '{value:%b %Y}',
        },
      },
      yAxis: {
        allowDecimals: false,
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
        title: {
          text: 'Users',
          style: {
            color: '#FFFFFF',
          },
        },
      },
      series: [
        {
          name: this.showYearlyData ? 'Yearly Active Users' : 'Monthly Active Users',
          data: chartData,
          type: 'line',
          color: '#ED0B51',
        },
      ],
      legend: {
        itemStyle: {
          color: '#FFFFFF',
        },
      },
    });
  }

  toggleDataView() {
    this.showYearlyData = !this.showYearlyData;
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
