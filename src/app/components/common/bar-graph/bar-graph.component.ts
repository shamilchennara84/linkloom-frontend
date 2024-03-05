import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { IApiRes } from '../../../core/models/interfaces/common';
import { UserService } from '../../../core/services/user.service';
import { IPostPerMonth, IPostPerYear } from '../../../core/models/interfaces/posts';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.css',
})
export class BarGraphComponent implements OnInit {
  chart!: Chart;
  showYearlyData = false;

  ngOnInit() {
    this.loadData();
  }

  constructor(private userService: UserService) {}

  loadData() {
    const dataFetcher = this.showYearlyData
      ? (this.userService.getPostsPerYear() as Observable<IApiRes<IPostPerYear[] | null>>)
      : (this.userService.getPostsPerMonth() as Observable<IApiRes<IPostPerMonth[]>>);

    if (this.showYearlyData) {
      (dataFetcher as Observable<IApiRes<IPostPerYear[] | null>>).subscribe(
        (response: IApiRes<IPostPerYear[] | null>) => {
          if (response.data) {
            const chartData = response.data.map((item) => [Date.parse(item.year), item.count, 0, 0]) as [
              number,
              number,
              number,
              number
            ][];
            this.updateChart(chartData);
            console.log(chartData);
          }
        }
      );
    } else {
      (dataFetcher as Observable<IApiRes<IPostPerMonth[]>>).subscribe((response: IApiRes<IPostPerMonth[]>) => {
        const chartData = response.data.map((item) => [
          Date.parse(item.monthYear),
          item.count,
          item.likes,
          item.comments,
        ]) as [number, number, number, number][];
        this.updateChart(chartData);
      });
    }
  }

  updateChart(chartData: [number, number, number, number][]) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.chart = new Chart({
      chart: {
        type: 'bar',
        width: 700,
        backgroundColor: '#111111',
      },
      title: {
        text: this.showYearlyData ? 'Post Popularity Metrics by Year' : 'Post Popularity Metrics by Month',
        style: {
          color: '#FFFFFF',
        },
      },
      xAxis: {
        categories: months,
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count',
          align: 'high',
        },
        labels: {
          style: { color: '#FFFFFF' },
        },
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Posts',
          type: 'bar',
          data: chartData.map((data) => data[1]),
          color: '#FFA500',
        },
        {
          name: 'Likes',
          type: 'bar',
          data: chartData.map((data) => data[2]),
          color: '#000080',
        },
        {
          name: 'Comments',
          type: 'bar',
          data: chartData.map((data) => data[3]),
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
}
