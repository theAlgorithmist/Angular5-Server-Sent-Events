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
 * Controller for Angular SSE Demo
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

import {Stocklist } from "../data/stocklist";

export class SseController
{
  // stock price data - mock this up any way you want ... currently returns static data.  There is no need for
  // async/await in this example - the structure is provided in case you want to move away from static to server-
  // generated data
  public static MOCK_GET_ALL_DATA: any = async (req: any, res: any) =>
  {
    // TODO put this in a try-catch block
    const data: Object = await Stocklist.find();

    res.status(200).json(data);
  };

  constructor()
  {
    // empty
  }
}
