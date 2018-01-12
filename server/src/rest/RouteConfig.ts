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
 * Server Sent Events Demo, route config
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

import * as express from 'express';

import {RequestHandler, Router} from 'express';
import {SseController         } from "../controllers/sseController";
import {SseManager            } from "../controllers/SseManager";
import {Environment           } from "../envrionment";

// stock price transform
import {basicTransform} from "../libs/stocktransform";

export class RouteConfig
{
  // reference to Express Router
  protected static _router: Router;

  // this manages the SSE streams
  protected static _sseManager: SseManager = new SseManager(basicTransform);

  constructor()
  {
    // empty
  }

  /**
   * Acess the router
   *
   * @returns {Router} Direct reference to Express Router
   */
  public static get router(): Router
  {
    if (!RouteConfig._router) {
      RouteConfig.__configRoutes();
    }

    return RouteConfig._router;
  }

  /** @internal */
  protected static __configRoutes(): void
  {
    // configure all the routes
    RouteConfig._router = Router();

    // some simple middleware ... and we do mean simple :)
    RouteConfig._router.use( function(req: any, res: any, next: express.NextFunction) {

      console.log("Route:", req.method, req.url);

      next();
    });

    const index: RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) =>
    {
      // render the Angular CLI-generated index.html file
      res.sendFile('index');
    };

    RouteConfig._router.get('/', index);

    const getAll: RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
       SseController.MOCK_GET_ALL_DATA(req, res);
    };

    RouteConfig._router.get(Environment.API_ROOT+'/getData', getAll);

    const subscribe: RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this._sseManager.subscribe(req, res);
    };

    RouteConfig._router.get(Environment.API_ROOT+'/subscribe', subscribe);
  }
}
