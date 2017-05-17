# koa-newrelic-route

Explicity set name a to each newrelic transaction according to the matching Koa route.

currently supports koa1 and koa2.

current version is beta

## Installation

```js
$ npm install koa-newrelic-route
```

## Example

```
    const newrelicRoute = require('koa-newrelic-route');
    const newrelic = require('newrelic');
    
    const routes = {
        get: {
            '/api/v1/resource/1': function* () {
                this.status = 200;
            },
            '/api/v1/resource/2': function* () {
                this.status = 200;
            }
        },
        post: {
            '/api/v1/resource/1': function* () {
                this.status = 200;
            },
            '/api/v1/resource/2': function* () {
                this.status = 200;
            }
        }
    };
    
    newrelicRoute(routes, newrelic);
    
```

## License

  MIT
