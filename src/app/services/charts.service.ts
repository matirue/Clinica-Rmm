import { Injectable } from '@angular/core';
import CanvasJS from 'canvasjs';
import html2canvas from 'html2canvas';
import { Chart } from 'angular-highcharts';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  options: any;
  constructor() {
    
  
    // add point to chart serie
    
  }
  agregarChart(chart: Chart){
    this.options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3]
        }
      ]
    }

    chart = new Chart(
      this.options
    )
  }
  
  // getGraficoTorta(){
  //   let chart = new CanvasJS.Chart("chartContainer", {
  //     theme: "light2",
  //     animationEnabled: true,
  //     exportEnabled: true,
  //     title:{
  //       text: "Monthly Expense"
  //     },
  //     data: [{
  //       type: "pie",
  //       showInLegend: true,
  //       toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
  //       indexLabel: "{name} - #percent%",
  //       dataPoints: [
  //         { y: 450, name: "Food" },
  //         { y: 120, name: "Insurance" },
  //         { y: 300, name: "Traveling" },
  //         { y: 800, name: "Housing" },
  //         { y: 150, name: "Education" },
  //         { y: 150, name: "Shopping"},
  //         { y: 250, name: "Others" }
  //       ]
  //     }]
  //   });
      
  //   chart.render();
  // }
}
