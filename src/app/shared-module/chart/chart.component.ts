import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {

  data1: any;
  data2:any;
  option1: any;
  option2:any;
  data3:any;
  option3:any;
  isDarkMode: boolean = false;
constructor(){}

ngOnInit() {
  // this.darkModeService.isDarkMode$.subscribe((isDarkMode: boolean) => {
  //   this.isDarkMode = isDarkMode;
  //   this.updateChartTheme();
  // });

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
                  label: 'Men',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  borderColor: documentStyle.getPropertyValue('--blue-400'),
                  data: [65, 59, 80, 81, 56, 55, 40,87,63,53,73,34]
              },
              {
                  label: 'Women',
                  backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                  borderColor: documentStyle.getPropertyValue('--pink-500'),
                  data: [28, 48, 40, 19, 86, 27, 90,33,4,55,67,77]
              }
          ]
      };

      this.option1 = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          title: {
            display: true,
            text: 'Percentage of Orders between Men and Women',
            color: textColor,
            font: {
              size: 18,
              weight: 'bold'
            }
          },
            legend: {
                labels: {
                    color: textColorSecondary
                }
            }, },
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




this.data2 = {
  labels: ['T-shirt', 'Boats', 'Sneakers', 'Sunglasses', 'Smartphones', 'Backpacks', 'Watches'],
  datasets: [
      {
          label: 'Lebanon',
          borderColor: documentStyle.getPropertyValue('--yellow-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--yellow-400'),
          pointBorderColor: documentStyle.getPropertyValue('--yellow-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--yellow-400'),
          data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
          label: 'Another countries',
          borderColor: documentStyle.getPropertyValue('--green-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--green-400'),
          pointBorderColor: documentStyle.getPropertyValue('--green-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--green-400'),
          data: [28, 48, 40, 19, 96, 27, 100]
      }
  ]
};

this.option2 = {
  plugins: {
    title: {
      display: true,
      text: 'Top product saling',
      color: textColor,
      font: {
        size: 18,
        weight: 'bold'
      }
    },
      legend: {
          labels: {
              color: textColor
          }
      }

},

  scales: {
      r: {
          grid: {
              color: textColorSecondary
          },
          pointLabels: {
              color: textColorSecondary
          }
        }
  },

};

this.data3 = {
  labels: ['LinkedIn', 'Facebook', 'Friends'],
  datasets: [
      {
          data: [300, 50, 100],
          backgroundColor: [documentStyle.getPropertyValue('--gray-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--pink-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--gray-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--pink-400')]
      }
  ]
};

this.option3 = {
  plugins: {
    title: {
      display: true,
      text: 'How They Know about Groth',
      color: textColor,
      font: {
        size: 18,
        weight: 'bold'
      }
    },
    legend: {
      labels: {
        color: textColor
      }
    }
  }
};



}
}
