import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ChartHoldersService {

  constructor(private generic: GenericService) { }

  getChartHoldersList() {
    return this.generic.getAll('Client/ChartHolder/ChartHolderList');
  }

  addNewChartHolder(obj) {
    return this.generic.post('Client/ChartHolder/SaveChartHolder', obj);
  }

  removeChartHolderById(id) {
    return this.generic.post('Client/ChartHolder/removeChartHolderRecord', id);
  }

  getCountries() {
    return this.generic.post('Client/ChartHolder/Countries', null);
  }

  getTimezoneCountrywise(country) {
    return this.generic.post('Client/ChartHolder/TimeZone', JSON.stringify(country));
  }
}
