import { formatNumber } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: any;

  constructor(private router: Router) {
    this.chartOptions = {
      series: [
        {
          name: "Tx",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + "k";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          fontFamily: "ProzaLibre",
          colors: ["#0f7cf9"]
          // colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18,
          style: {
            fontFamily: "ProzaLibre"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#123156",
              colorTo: "#0f7cf9",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
          style: {
            fontFamily: "ProzaLibre"
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: ["#123156"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return formatNumber(1000 * val, 'en-US');
          },
          style: {
            color: "#123156",
            fontFamily: "ProzaLibre"
          }
        }
      },
      title: {
        text: "Monthly TX, 2024",
        floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#123156",
          fontFamily: "ProzaLibre"
        }
      }
    };
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

}
