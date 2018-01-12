/**
 * Copyright 2018 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Stock price display component displays a list of stock price data in a 2D (two-column) grid using Material cards
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

// platform
import { Component
       , OnChanges
       , Input
       } from '@angular/core';

// minimal stock price model
import { IStockData } from "../../../../server/src/models/StockData";

// utilities
import { Utils } from "../../../../server/src/libs/Utils";

// internal model to facilitate additional data beyond the minimum that is computed/displayed by this component
export interface ISummaryData extends IStockData
{
  delta: number;
  openDisplay: boolean;
}

@Component({
  selector: 'app-stockdisplay',

  templateUrl: './stockdisplay.component.html',

  styleUrls: ['./stockdisplay.component.scss']
})
export class StockdisplayComponent implements OnChanges
{
  // input property that accepts a list of stock price data
  @Input() prices: Array<IStockData>;

  // process input stock price data into a 2D grid
  public items: Array<Array<ISummaryData>>;

  // prior price collection (used to compute price deltas)
  protected _prevPrices: Array<IStockData>;

  /**
   * Construct a new Stock Price Display Component
   *
   * @returns {nothing}
   */
  constructor()
  {
    this._prevPrices = new Array<IStockData>();
  }

  /**
   * Angular lifecycle method - on changes (whenever input/data bound properties change during a CD cycle)
   *
   * @returns {nothing}
   */
  public ngOnChanges(): void
  {
    // rebuild the items grid from the linear price list whenever price list input array changes
    this.items = new Array<Array<ISummaryData>>();

    console.log( " stock price change in display component" );

    // current grid is two-column
    if (this.prices.length > 0)
    {
      const n: number = this.prices.length;
      const j: number = n / 2;

      this.items.length = 0;

      let k: number       = 0;
      let deltak: number  = 0;
      let deltak1: number = 0;

      let i: number;

      // initial rows always contain two items
      for (i = 0; i < j-1; ++i)
      {
        deltak  = this.__getDelta(this.prices[k]);
        deltak1 = this.__getDelta(this.prices[k+1]);

        this.items.push( [ Object.assign(this.prices[k], {delta:deltak, openDisplay: false}),
                           Object.assign(this.prices[k+1], {delta:deltak1, openDisplay: false}) ] );
        k += 2;
      }

      // last row contains one or two items
      let final: Array<ISummaryData> = new Array<ISummaryData>();
      deltak                         = this.__getDelta(this.prices[k]);

      final.push( Object.assign(this.prices[k], {delta:deltak, openDisplay: false}) );

      if (k < n-1)
      {
        deltak1 = this.__getDelta(this.prices[k+1]);
        final.push( Object.assign(this.prices[k+1], {delta:deltak1, openDisplay: false}) );
      }

      this.items.push( final );

      // copy for next update
      this._prevPrices = this.prices.slice();
    }
  }

  /** @internal */
  protected __getDelta(stock: IStockData): number
  {
    // compute stock-price delta (change from previous update)

    // compensate for first price set (i.e. no prior data)
    if (this._prevPrices.length == 0 ) {
      return 0;
    }

    const index: number = Utils.findStockIndex(stock, this._prevPrices);

    if (index != -1) {
      return stock.current - this._prevPrices[index].current;
    }

    return 0;
  }

  /** @internal */
  public onInfoClicked(symbol: string): void
  {
    // handle user clicking the 'info' icon corresponding to the input ticker symbol

    // find the summary item corresponding to the ticker symbol
    const data: ISummaryData = this.__find(symbol);

    if (data)
    {
      // toggle the 'open' property to true to control optional data display
      data.openDisplay = !data.openDisplay;
    }
  }

  /** @internal */
  public __find(symbol: string): ISummaryData | null
  {
    // find the summary data corresponding to the input ticker symbol
    const n: number = this.prices.length;
    let i: number;
    let j: number;
    let row: Array<ISummaryData>;
    let data: ISummaryData;

    for (i = 0; i < n; ++i)
    {
      row = this.items[i];
      for (j = 0; j < row.length; ++j)
      {
        data = row[j];
        if (data.symbol === symbol) {
          return data;
        }
      }
    }

    return null;
  }
}
