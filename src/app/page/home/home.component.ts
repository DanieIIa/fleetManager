import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vehicleChart: GoogleChartInterface;
  driverChart: GoogleChartInterface;
  dayChart: GoogleChartInterface;
  pieChartOptions: any = {
    is3D: true,
    chartArea: { width: 400, height: 400 }
  };
  columnChartOptions: any = {
    is3D: true,
    chartArea: { width: 800, height: 400 }
  }

  constructor(
    private baseService: BaseService
  ) {

  }

  ngOnInit(): void {
    this.baseService.query('fuelings', '?_expand=vehicle&_expand=driver')
      .then(
        data => {
          this.initCharts (data)
        },
        err => console.log(err)
      );
  }

  initCharts(data): void {
    let byVehicle = this.processByType(data, row => row.vehicle.lp, row => row.amount);
    console.log(byVehicle);

    let byDriver = this.processByType(data, row => row.driver.name, row => row.amount);
    console.log(byVehicle);

    let byDay = this.processByType(data, row => row.date, row => row.amount);
    console.log(byVehicle);

    this.vehicleChart = this.collectchartData(
      [['Vehicle', 'Consumption']].concat(byVehicle),
       'PieChart',
        this.pieChartOptions
    );

    this.driverChart = this.collectchartData(
      [['Driver', 'Consumption']].concat(byDriver),
       'PieChart',
        this.pieChartOptions
    );

    this.dayChart = this.collectchartData(
      [['Vehicle', 'Consumption']].concat(byDay),
       'ColumnChart',
        this.columnChartOptions
    );

    console.log(this.vehicleChart);
  }

  collectchartData(data: any[], type: string, options: any): any{
    return{
    chartType: type,
    dataTable: data,
    options: options
    };
  }

  processByType(data: any[], getKey: Function, getValue):any[]{
    let processed: any = {};
    let table: any[] = [];

    for(let row of data){
      let key = getKey(row);
      if(!processed[key]){
        processed[key] = 0;
      }
      processed[key] += parseInt(getValue(row)); 
    }
    for(let k in processed){
      table.push([k, processed[k]]);
    }

    return table;
  }
}
