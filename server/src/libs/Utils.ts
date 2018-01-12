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
 * Some helpful utilities to keep things nice and DRY
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import {IStockData} from "../models/StockData";

export class Utils
{
  public static findStockIndex(stock: IStockData, list: Array<IStockData>): number
  {
    const n: number = list.length;
    let i: number;
    let data: IStockData;

    for (i = 0; i < n; ++i)
    {
      data = list[i];
      if (data.symbol === stock.symbol) {
        return i;
      }
    }

    return -1;
  }
}
