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


import {ErrorRequestHandler} from "express";

/**
 * A variety of error handlers, most of which are similar to others you have seen.  Nothing new here :)
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

export class ErrHandlers
{
  // composed function is an alternative to try-catch in async/await block and is easily re-used
  public static catchErrors: Function = (fn: Function) => {
    return function (req: any, res: any, next: Function) {
      return fn(req, res, next).catch(next);
    };
  };

  // Not Found Error Handler
  public static notFound: any = (req: Request, res: Response, next: Function) => {
    const err: Error = new Error('(404) Not Found: ' + req.url);

    if (next) {
      next(err);
    }
  };

  // dev err handler - pretty much boilerplate stuff ripped from other examples
  public static devErrors: ErrorRequestHandler = (err: Error, req: any, res: any) => {
    err.stack = err.stack || '';

    const details = {
      message: err.message,
      status: res.status,
      stackHighlighted: err.stack.replace(/[a-z-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };

    res.status(res.status || 500);

    res.format({
      'text/html': () => {
        res.render('Error: ', details);
      },
      'application/json': () => res.json(details)
    });
  };


  // prod err handler
  public static prodErrors: ErrorRequestHandler = (err: any, req: any, res: any) => {
    res.status(err.status || 500);

    // need to have an error view if you want to use this
    res.render('error', {
      message: err.message,
      error: {}
    });
  };

  constructor()
  {
    // empty
  }
}
