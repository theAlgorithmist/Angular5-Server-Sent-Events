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
 * Server Sent Events Demo, Node Application file
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';

import {Environment} from "./envrionment";
import {Router     } from 'express';
import {RouteConfig} from "./rest/RouteConfig";

export class NodeApplication
{
  protected _server: http.Server;           // ref to Express http server
  protected _expApp: express.Application;   // the Express Application

  /**
   * Construct a new NodeApplication
   *
   * @returns {nothing}
   */
  constructor()
  {
    this.__configureApp();

    this.__configureRoutes();

    this.__configureHandlers();
  }

  /**
   * Access the Express app
   *
   * @returns {Application} Direct refernce to Express Application
   */
  public get expressApp(): express.Application
  {
    return this._expApp;
  }

  /**
   * Begin listening on the port specified in the environment
   *
   * @returns {nothing}
   */
  public listen(): void
  {
    this._server = this._server || this._expApp.listen(this._expApp.get('port'), () => {
      console.log(`Express is now running on PORT ${this._server.address().port}`);
    });
  }

  /** @internal */
  protected __configureApp(): void
  {
    // configure the Express Application
    this._expApp = express();

    // serve static html files out of the CLI-generated dist folder
    this._expApp.use(express.static( path.join(__dirname + '/../../dist') ));

    this._expApp.set('views', path.join(__dirname, '/../../dist'));
    this._expApp.set('view engine','ejs');
    this._expApp.engine('html', require('ejs').renderFile);

    this._expApp.set('env', Environment.NODE_ENV);

    this._expApp.use(bodyParser.json());
    this._expApp.use(bodyParser.urlencoded({ extended: true }));

    this._expApp.set('port', Environment.PORT || 8000);
  }

  /** @internal */
  protected __configureRoutes(): void
  {
    // Configure all routes
    const router: Router = RouteConfig.router;

    this._expApp.use("/", router);
  }

  /** @internal */
  protected __configureHandlers(): void
  {
    // add middleware to be used after any routing middleware; placeholder for your modifications to the demo
  }
}

// and away we go ...
const nodeApp: NodeApplication = new NodeApplication();
nodeApp.listen();
