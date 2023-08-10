import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChartHolder } from 'src/app/models/chartholders/chart-holder';
import { ChartHoldersService } from 'src/app/services/chart-holders.service';

@Component({
  selector: 'app-chart-holder-details',
  templateUrl: './chart-holder-details.component.html',
  styleUrls: ['./chart-holder-details.component.css']
})
export class ChartHolderDetailsComponent implements OnInit {

  chartHolders: ChartHolder;
  countries: any;
  timezones: any;
  gender: string = '';

  constructor(private chartHoldersService: ChartHoldersService, private toastr: ToastrService) {
    this.chartHolders = new ChartHolder();
  }

  ngOnInit(): void {
    this.getCountriesList();
  }


  addNewChartHolder() {
    debugger
    if (this.gender == 'male') {
      this.chartHolders.WrGender = true;
    }
    else {
      this.chartHolders.WrGender = false;
    }

    this.chartHoldersService.addNewChartHolder(this.chartHolders).subscribe(
      res => {
        debugger;
        if (res != null || res != undefined) {
          debugger
          if (res.success) {
            this.toastr.success(res.message);
          }
        }
      }
    )
  }

  getCountriesList() {
    this.chartHoldersService.getCountries().subscribe(
      res => {
        debugger;
        if (res && (res != null || res != undefined)) {
          res = JSON.parse(res);
          if (res.result != null) {
            this.countries = res.result;
          }
        }
      });
  }

  getTimeZoneCountrywise(countryName) {
    // let t=new Test();
    // t.countryName=countryName;
    this.chartHoldersService.getTimezoneCountrywise(countryName).subscribe(
      res => {
        debugger;
        if (res && (res != null || res != undefined)) {
          res = JSON.parse(res);
          if (res.result != null) {
            this.timezones = res.result;
          }
        }
      });
  }

  dropdownCountrySelected(selected) {
    this.getTimeZoneCountrywise(selected);
  }

}
export class Test{
  countryName:string;
}
