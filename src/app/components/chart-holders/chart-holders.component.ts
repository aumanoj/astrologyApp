import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterResponse } from 'src/app/models/register/register-response';
import { ChartHolder } from '../../models/chartholders/chart-holder';
import { ChartHoldersService } from '../../services/chart-holders.service';

@Component({
  selector: 'app-chart-holders',
  templateUrl: './chart-holders.component.html',
  styleUrls: ['./chart-holders.component.css']
})
export class ChartHoldersComponent implements OnInit {

  chartHolders: ChartHolder[];
  constructor(private chartHoldersService: ChartHoldersService, private toastr: ToastrService) {
    this.chartHolders = [];
   }

  ngOnInit(): void {
    this.getChartHoldersList();
  }


  getChartHoldersList() {
    this.chartHoldersService.getChartHoldersList().subscribe(
      res => {
        debugger;
        if(res != null || res != undefined) {
          res = JSON.parse(res);
          res = res.result;
          this.chartHolders = res;
        }
      }
    )
  }
  deleteChartHolder(id) {
    this.chartHoldersService.removeChartHolderById(id).subscribe(
      res => {
        debugger;
        if(res != null || res != undefined) {
          res = JSON.parse(res);
          if(res.success) {
            this.toastr.success(res.message);
            this.getChartHoldersList();
          }
          else {
            this.toastr.error(res.message);
          }
        }
        else {
          this.toastr.error('Something went wrong!');
        }
      }
    )
  }

}
