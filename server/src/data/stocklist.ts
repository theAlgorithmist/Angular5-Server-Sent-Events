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
 * No demo is worth anything without some data :)
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { IPriceModel } from "../models/PriceModel";

export class Stocklist
{
  /**
   * Find all stocks available for regular updates
   *
   * @returns {IPriceModel}
   */
  public static find(): IPriceModel
  {
    return {
      pricelist: [
        {
          symbol: "IBM",
          name: "Int. Bus. Machines",
          low: 153.7,
          high: 154.17,
          current: 154.03
        },
        {
          symbol: "DVMT",
          name: "Dell Computer",
          low: 80.36,
          high: 81.5,
          current: 81.4
        },
        {
          symbol: "AAPL",
          name: "Apple",
          low: 169.31,
          high: 170.59,
          current: 169.86
        },
        {
          symbol: "HPE",
          name: "Hewlett Packard",
          low: 13.78,
          high: 14.67,
          current: 14.12
        },
        {
          symbol: "AMD",
          name: "Advanced Micro Dev.",
          low: 10.025,
          high: 10.5,
          current: 10.5
        },
        {
          symbol: "INTC",
          name: "Intel Corp.",
          low: 45.49,
          high: 46.5,
          current: 46.0
        }
      ]
    }
  }
}
