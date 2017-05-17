const methods = require('methods');

module.exports = (routes, newrelic) => {
    if (!newrelic) {
        return;
    }
    methods.forEach(method => {
        if (!routes[method]) {
            return;
        }
        Object.keys(routes[method]).forEach(path => {
            const handler = routes[method][path];
            routes[method][path] = function* ( ...args) {
                const name = `${method}${path}`;
                newrelic.setTransactionName(name);
                return yield* handler.call(this, ...args);
            };
        });
    });
};
