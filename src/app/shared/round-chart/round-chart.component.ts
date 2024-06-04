import { Component } from '@angular/core';

@Component({
  selector: 'app-round-chart',
  templateUrl: './round-chart.component.html',
  styleUrls: ['./round-chart.component.css']
})
export class RoundChartComponent {


  data3:any;
  option3:any;
  isDarkMode: boolean = false;
constructor(){}

ngOnInit() {
  this.updateChartTheme();
}

updateChartTheme() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = this.isDarkMode ? 'white' : documentStyle.getPropertyValue('--text-color');


this.data3 = {
  labels: ['Translation', 'Transaction', 'Audio-visual','Content services'],
  datasets: [
      {
          data: [300, 50, 100,50],
          backgroundColor:'#203269',
          hoverBackgroundColor: '#1b59f81a'
      }
  ]
};

this.option3 = {
  responsive: true,  // Ensure the chart is responsive
  maintainAspectRatio: false, 
  plugins: {
    title: {
      display: true,
      text: 'Requests',
      color: '#203269',
      font: {
        size: 18,
        weight: 'bold'
      }
    },
    legend: {
      labels: {
        color: '#203269'
      }
    }
  }
};



}
}
