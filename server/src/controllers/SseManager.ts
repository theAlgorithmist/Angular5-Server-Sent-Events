/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
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
 * Server Sent Events Demo, manage server-sent events
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

import {Stocklist} from "../data/stocklist";
import {IStockData} from "../models/StockData";

import {RandomIntInRange} from "../libs/RandomIntInRange";

import {Request, Response} from "express";

import {Observable  } from "rxjs/Rx";
import {timer       } from "rxjs/observable/timer";
import {Subscription} from "rxjs/Subscription";

import 'rxjs/add/operator/do';

export interface ITransformData
{
  (data: Object): Object;
}

export class SseConnection
{
  protected _id: number;
  protected _res: Response;

  constructor(res: Response, id: number)
  {
    this._res = res;
    this._id  = id;
  }

  public get res(): Response
  {
    return this._res;
  }

  public sendEvent(data: Object): void
  {
    console.log( "  - sending message from connection id: ", this._id );
    this._res.write('data:' + JSON.stringify(data) + '\n\n');
  }
}

export class SseManager
{
  // reference to injectable stock price transform
  protected _updateData: ITransformData;

  // our SSE clients
  protected _clients: Array<SseConnection>;

  // current client ID - generated sequentially
  protected _clientId: number;

  // reference to a subscription (you will need this for one of the exercises)
  protected _subscription: Subscription;

  // For demo purposes, the manager owns a collection of raw data, but this too could be made injectable
  protected _stockData: Array<IStockData>;

  /**
   * Construct a new SseManager
   *
   * @param {ITransformData} updater Reference to a stock data transform function
   *
   * @returns {nothing}
   */
  constructor(updater: ITransformData)
  {
    this._updateData = updater ? updater : (data: Object) => { return {} };

    this._clients = new Array<SseConnection>();

    this._clientId = 0;

    this._subscription = null;

    // get all the available stock price data
    this._stockData = Stocklist.find().pricelist;
  }

  /**
   * Subscribe to stock price updates
   *
   * @param {e.Request} req Express Request Object
   *
   * @param {e.Response} res Express Response Object
   *
   * @returns {nothing}
   */
  public subscribe(req: Request, res: Response): void
  {
    req.socket.setTimeout(Number.MAX_SAFE_INTEGER);

    // headers for SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    res.write('\n');

    const connection: SseConnection = new SseConnection(res, this._clientId);

    // this is a bit sloppy
    connection.res.on( 'close', () => this.__clearConnection(connection));

    // start price updates on first new subscriber; this is also internal to make deconstruction easier
    if (!this._subscription)
    {
      this._subscription = Observable.of(null)
      .concatMap( () => timer(5000 + Math.random()*5000) )
      .do( () => console.log("new price update") )  // think of this as 'middleware' - remove if unwanted
      .repeat()
      .subscribe( () => this.__updateClients() );
    }

    this._clients.push(connection);

    this._clientId++;
  }

  /** @internal */
  protected __clearConnection(conn: SseConnection): void
  {
    // clear the input connection; first find its index in the connections list
    const i: number = this._clients.indexOf(conn);

    console.log( 'clear connection, index: ', i );

    if (i != -1) {
      this._clients.splice(i,1);
    }

    // Exercise: if the subscriber list goes to zero length, turn off price updates and make that process
    // capable of being toggled.
  }

  /** @internal */
  protected __updateClients(): void
  {
    // update all clients with new stock data ... but only if there are clients to update
    if (this._clients.length == 0) {
      return;
    }

    // transform the price data; first choose an index of which stock to modify
    const index: number = RandomIntInRange.generateInRange(0, this._stockData.length-1);

    let data: IStockData = this._stockData[index];

    // apply the input transform to this data - in this case, we are simulating obtaining new data from some
    // external source, so we want to mutate the existing data
    data = <IStockData> this._updateData(data);

    // slower, but more compact
    this._clients.forEach( (connection: SseConnection) => connection.sendEvent(data) );
  }
}
