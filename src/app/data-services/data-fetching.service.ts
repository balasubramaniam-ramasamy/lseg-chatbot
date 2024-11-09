import { Injectable } from '@angular/core';
import { StockData } from './stock-data-json';
import { IStockData } from './stock-data-interface';


@Injectable({
  providedIn: 'root'
})
export class DataFetchingService {

  constructor() { }

  // return the json stock exchange and its top stocks data
  getStockData(): IStockData[] {
    return StockData;
  }

  // return an custom end menu
  getEndMenu(): IStockData[] {
    return [{
      code: 'Main menu',
      stockExchange: '',
      topStocks: []
    }, {
      code: 'Go back',
      stockExchange: '',
      topStocks: []
    }]
  }
}
