import { Component, OnChanges, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CryptoDataService } from './services/crypto-data-service';
import * as Chart from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  canvas;
  ctx;
  title = 'piździsko';
  chart;
  x = [];
  y = [];

  constructor(private cryptoDataService : CryptoDataService) {}

  ngAfterViewInit() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d');


    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.x,
        datasets: [
          { 
            data: this.y,
            borderColor: "#3cba9f",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  ngOnInit(){

    this.cryptoDataService.dailyForecast()
    .subscribe(res => {
      this.cryptoDataService.cryptoData.forEach(
        record => {
            this.x.push(record.time);
            this.y.push(record.average)
          }
      )
      //console.log(res)
      //console.log(this.cryptoDataService.cryptoData.forEach)
      // res.forEach(record => {
      //   x.push(record.time);
      //   y.push(record.average)
      // })
    })


  }

}


