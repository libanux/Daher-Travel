import { Component } from '@angular/core';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css'
})
export class AreaChartComponent {
  sineWaveAreaData: any;
    sineWaveAreaOptions: any;

    ngOnInit() {
        const sineWavePoints = this.generateSineWaveData();
        this.sineWaveAreaData = {
            labels: sineWavePoints.labels,
            datasets: [
                {
                    label: 'Income',
                    data: sineWavePoints.data,
                    fill: true,
                    borderColor: '#203269',
                    backgroundColor: 'rgba(66, 165, 245, 0.4)',
                    tension: 0.1
                }
            ]
        };

        this.sineWaveAreaOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X-axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y-axis'
                    }
                }
            }
        };
    }

    generateSineWaveData() {
        const labels = [];
        const data = [];
        for (let i = 0; i <= 360; i += 10) {
            const radians = i * (Math.PI / 180);
            labels.push(i.toString());
            data.push(Math.sin(radians));
        }
        return { labels, data };
    }
}
