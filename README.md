# Angular 5 Server Sent Events


The topic of server push comes up on occasion and the typical response is polling.  AJAX is suitable for most server requests, but some applications require an unknown number of updates from the server that occur at irregular (and almost always unknown) intervals.

Server Sent Events (SSE) is an attractive and often-overlooked option (once you get beyond the need for polyfills for MS browsers).  SSE also work nicely with an Angular 5+ client and Node/Express on the back end.  So, here is an example using a hypothetical stock-price update application.

And, yes, I found a way to sneak a bit of math into this demo with the Typescript Math Toolkit _TSMT$RandomIntInRange_ class (insert evil laugh here).


Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular: 5.0.2

Material: 2.0.0-beta.6

flex-layout: 2.0.0-beta.12

Angular CLI: 1.6.2


## The Client

The hypothetical example in this demo is a stock price viewer that receives periodic updates of new prices in a 'watch list' of stocks.  A summary of price information is displayed in _Material Cards_, arranged in a two-column grid.

![client screen shot](sse-screen.png?raw=true)

The UI is visually bland, but suitable for purposes of the demo.  Each Material Card contains an _info_ button that displays some additional (calculated) information regarding the stock.  The price delta (difference between current and most recent price) is displayed in the current version of the UI upon clicking the _info_ button.  Clicking again toggles the display off.

An initial set of stock data is returned by the server.  Click on the 'Subscribe To Updates' button to begin a simulation of obtaining new updates.  The current implementation provides a single stock update approximately every 5-10 seconds.  If the price delta is positive, the _info_ button is displayed with a green color.  If negative, the _info_ button is displayed in red.  This provides a quick visual indication as to which stock was updated and whether the price move was up or down relative to the prior price.

Since the client is relatively small (only two components), this demo is good for those still getting up to speed with Angular.  The client illustrates

* Basics of using flex-layout

* How to use _HttpClient_, particularly maintaining compile-time checking of the shape of server-supplied Objects across the client and server code base.

* One possible use of the _ngOnChanges_ lifecyle method.

* Nested _*ngIf_ usage

* How to use _ngClass_

* How to integrate _Material_ components into an application, including styling

* Subscribe to SSE, receive updates, and manage component display (hint: SSE do not work through XHR)

This is an Angular CLI-generated project, so the client source code resides in the _src_ folder.

Note: In past projects using _Material_, I added the custom theme _.scss_ file into the styles section inside _.angular-cli.json_.  A lot of developers new to Angular do not even know that file exists, so I used a different approach in this demo.  You should be able to deconstruct all styling from the main _styles.scss_ file in the _src_ folder.


## The Server

Synthetic data is used for this demo, so it is not a traditional MEAN application as only Node and Express are used on the back end.  

In my prior full-stack demo, I wanted to show how Typescript computational libraries could be directly integrated into an existing Node application, so I wrote the server in straight ES6 in a manner similar to many other _Node/Express_ applications.

In this demo, the entire back end is written in Typescript, more along the approach I would prefer in a realistic environment.  Here are some bullet points to review before deconstructing the code.


* Server source resides in the _server/src_ folder and artifacts are generated into _server/dist_ (see the _tsconfig.json_ file in the _server_ folder).

* Main _Node_ application is in _server/app.ts_.

* Environment variables are assigned in _server/src/environments/environment.ts_.

* Routing is performed with the _Express Router_ and this is where you will find the route to subscribe to SSE.  See _server/src/rest/RouteConfig.ts_.

* A separate manager class handles creation/destruction of SSE clients and sending updates to each subscribed client.

* The process of periodic (but irregular) price updates is simulated.

* Different price generations may be obtained by passing a new transform function into the SSE Manager.  See _server/src/libs/stocktransform.ts_.

* Several _console_ logs are spread out through both the server and client in order to better illustrate application flow between server and client.


NOTE: Price simulation begins after clicking the 'Subscribe To Updates' button in the client.  It will continue even after the last client window is closed.  There are log statements that show this behavior in the server window.  I left the process of cleaning this up as an exercise (and it is marked with comments) as this serves as a good way to quickly gain familiarity with the code.
 

## Build And Run The Application

As with any other Angular CLI project, run `ng build` from the project root to build the client. The build artifacts are stored in the `dist` directory.  DO NOT run `ng serve`.

From the server folder, execute `npm run build-server` to compile the server files.  Then type `npm run start-server` to start up the server.  Without any changes, you should see the message

`Express is now running on PORT 8080`   

Open your friendly, neighborhood browser and type in `localhost: 8080`.  You will then see my latest entry into the world's ugliest UI competition.

Then, experiment and have fun!


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>
