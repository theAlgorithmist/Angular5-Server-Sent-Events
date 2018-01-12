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
 * A small collection of environment-related variables
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

export class Environment
{
  // environment in which Node is to be run
  public static DEV: string  = 'DEV';
  public static PROD: string = 'PROD';

  public static LOG_LEVEL: number = 0;                // in case you want to add logging
  public static PORT: number      = 8080;             // port number
  public static IP: string        = '127.0.0.1';      // IP for the demo
  public static API_ROOT: string  = '/api/v1';        // api root for the demo
  public static NODE_ENV: string  = Environment.DEV;  // the Node environment

  constructor()
  {
    // empty
  }
}
