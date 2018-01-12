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
 * A stock transform function that allows for simulation of periodic price updates
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import {IStockData} from "../models/StockData";

export function clone(data: IStockData): IStockData
{
  return {
    symbol: data.symbol,
    name: data.name,
    low: data.low,
    high: data.high,
    current: data.current
  };
}

/**
 * Compute a new collection of stock data
 *
 * @param {Object} data Expected to be an IStockData collection containing current price information
 *
 * @returns {Object} New IStockData collection with updated high/low/current price
 */
export function basicTransform(data: Object): Object
{
  // data is expected to represent IStockData - clone can be used if you want to modify the demo in a way that
  // preserves immutability of original data
  let priceData: IStockData = <IStockData> data;

  // compute a price that is up or down with approx. equal probability and between 1-5% of the stock's current range.
  const range: number  = priceData.high - priceData.low;
  const mult: number   = 1.0 + 4.0*Math.random();          // percentage
  const amount: number = 0.01*mult*range;                  // actual amount
  const dir: number    = Math.random() <= 0.5 ? -1 : 1;    // up or down?

  priceData.current = priceData.current + dir*amount;      // new price

  // do we have a new high or low?
  priceData.low  = Math.min(priceData.low, priceData.current);
  priceData.high = Math.max(priceData.high, priceData.current);

  return priceData;
}
