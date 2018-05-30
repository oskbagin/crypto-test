import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CryptoDataService {

    cryptoData = [];

    constructor(private _http: HttpClient) { }
  
    dailyForecast() {
      return this._http.get("https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json")
      .pipe(map(result => {this.cryptoData = result}));
    }
  
  }
  