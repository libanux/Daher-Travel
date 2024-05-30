import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit {
  lineChartData:any
  lineChartOptions:any
  constructor() { }

  ngOnInit() {
    this.lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Payments',
              backgroundColor: '#203269',
              borderColor: '#203269',
              data: [65, 59, 80, 81, 56, 55, 40]
          }
      ]
  };
  
  this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false
  };
  }
}
