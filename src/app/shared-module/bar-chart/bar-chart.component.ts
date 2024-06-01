import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  data1: any;
  option1: any;
  isDarkMode: boolean = false;
  constructor() { }

  ngOnInit() {
    this.updateChartTheme();
  }

  updateChartTheme() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.isDarkMode ? 'white' : documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.isDarkMode ? 'white' : documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Requests',
          backgroundColor: '#f4ba19',
          borderColor: documentStyle.getPropertyValue('--blue-400'),
          data: [65, 59, 80, 81, 56, 55, 40, 87, 63, 53, 73, 34]
        },
        {
          label: 'Responses',
          backgroundColor: '#203269',
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90, 33, 4, 55, 67, 77]
        }
      ]
    };

    this.option1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        title: {
          display: true,
          text: 'Percentage between accepted and rejected',
          color: '#f4ba19',
          font: {
            size: 18,
            weight: 'bold'
          }
        },
        legend: {
          labels: {
            color: textColorSecondary
          }
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months',
            font: {
              size: 16,
              weight: 'bold',
              color: textColor
            }
          },
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
              color: textColorSecondary
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: true
          }
        },
        y: {
          title: {
            display: true,
            text: 'Percentage (%)',
            font: {
              size: 16,
              weight: 'bold',
              color: textColorSecondary
            }
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 50,
          bottom: 50
        }
      },
      width: "100%"
    };
  }
}
