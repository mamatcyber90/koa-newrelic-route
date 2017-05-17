# koa-newrelic-route

Explicity set name a to each newrelic transaction according to the matching Koa route.

## Installation

If you use generator functions as route handlers then install:
```npm i --save koa-newrelic-route@beta```

If you async functions, or functions that return promises as route handlers then install:
```npm i --save koa-newrelic-route@promises```

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
