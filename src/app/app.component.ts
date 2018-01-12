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
 * Server Sent Events Demo, main client-side app component.  The main component owns data collection and management;
 * data display is deferred to a child component.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

// platform
import { Component
       , OnInit
       , ChangeDetectorRef
       } from '@angular/core';

import { HttpClient } from "@angular/common/http";

// stock price model
import { IStockData  } from "../../server/src/models/StockData";
import { IPriceModel } from "../../server/src/models/PriceModel";

// utilities
import {Utils} from "../../server/src/libs/Utils";

// Minimal declarations for EventSource (would help to have @types/EventSource) - here is a better path to follow:
// https://github.com/yankee42/typescript-server-sent-events/blob/master/sse.d.ts
interface CallbackFcn
{
  (data: any): void;
}

declare class EventSource
{
  constructor(name: string);

  onopen: CallbackFcn;

  onmessage: CallbackFcn;

  onerror: CallbackFcn;

  addEventListener(evt: string, cb: CallbackFcn): void;
}

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  // main stock price array; this is the source of truth for current stock price information
  public priceData: Array<IStockData>;

  // reference to an EventSource to process SSE
  protected _eventSource: EventSource;

  // have we subscribed to an event stream yet?
  protected _subscribed: boolean = false;

  /**
   * Construct a new root app component
   *
   * @param {HttpClient} _service Injected HttpClient
   *
   * @param {ChangeDetectorRef} _chgDetectorRef Injected Change Detector Reference
   *
   * @returns {nothing}
   */
  constructor(protected _service: HttpClient,
              protected _chgDetectorRef: ChangeDetectorRef)
  {
    this.priceData = new Array<IStockData>();
  }

  /**
   * Angular lifecycle method - on init
   *
   * @returns {nothing}
   */
  public ngOnInit(): void
  {
    // request the price data
    this._service.get<IPriceModel>('/api/v1/getData').subscribe( res => this.__onDataLoaded(res) );
  }

  /** @internal */
  public onSubscribe(): void
  {
    // handle clicking the subscribe to updates button
    if (!this._subscribed)
    {
      this._eventSource           = new EventSource('/api/v1/subscribe');
      this._eventSource.onmessage = (data) => this.__onMessage(data);
      this._eventSource.onerror   = (evt) => this.__onSseError(evt);

      this._subscribed = true;
    }
  }

  /** @internal */
  protected __onDataLoaded(data: IPriceModel): void
  {
    // initial data has been loaded; copy to the current price list collection
    this.priceData = data.pricelist.slice();
  }

  /** @internal */
  protected __onMessage(message: Object): void
  {
    // process SSE messages
    const stock: IStockData = <IStockData> JSON.parse( message['data'] );

    // find the index corresponding to the stock that was updated
    const index: number = Utils.findStockIndex(stock, this.priceData);

    if (index != -1)
    {
      // mutate the price data; note that EventSource does not work through XHR, so there is nothing to triggers a
      // CD cycle in Angular upon processing the message
      let newData: Array<IStockData> = this.priceData.slice();

      newData[index] = stock;

      // the reference has to change to fire the display component's onChanges handler; the array copy is acceptable
      // since a list of observed stock prices is almost always very small.  There is another way to handle this which
      // will be illustrated in a future demo.
      this.priceData = newData;

      this._chgDetectorRef.detectChanges();
    }
    else
    {
      // enhance error-handling as you see fit
      console.log('Update provided for non-existing stock: ', stock );
    }
  }

  /** @internal */
  protected __onSseError(e: any): void
  {
    // modify event handling as you see fit
    console.log( "SSE Event failure: ", e );
  }
}
