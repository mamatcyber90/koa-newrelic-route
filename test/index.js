const sinon = require('sinon');

const newrelicRoutes = require('../index');

describe('Test koa-newrelic-route', function () {

    before(function () {
        this.sandbox = sinon.sandbox.create();
        this.handlerSpy = this.sandbox.spy();
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('should call the newrelic.setTransaction method', function* () {

        const { handlerSpy } = this;

        function getHandler() {
            return function* (...args) {
                return yield* (function* () {
                    handlerSpy(...args);
                    yield Promise.resolve();
                }());
            }
        }

        const routes = {
            get: {
                '/api/v1/resource/1': getHandler(),
                '/api/v1/resource/2': getHandler()
            },
            post: {
                '/api/v1/resource/1': getHandler(),
                '/api/v1/resource/2': getHandler()
            },
            put: {
                '/api/v1/resource/1': getHandler(),
                '/api/v1/resource/2': getHandler()
            },
            delete: {
                '/api/v1/resource/1': getHandler(),
                '/api/v1/resource/2': getHandler()
            }
        };

        const setTransactionNameSpy = this.sandbox.spy();

        const newrelic = {
            setTransactionName: (...args) => setTransactionNameSpy(...args)
        };

        newrelicRoutes(routes, newrelic);

        yield* routes.get['/api/v1/resource/1']();
        yield* routes.get['/api/v1/resource/2']();
        yield* routes.post['/api/v1/resource/1']();
        yield* routes.post['/api/v1/resource/2']();
        yield* routes.put['/api/v1/resource/1']();
        yield* routes.put['/api/v1/resource/2']();
        yield* routes.delete['/api/v1/resource/1'](1, 2, 3);
        yield* routes.delete['/api/v1/resource/2'](1, 2, 3);

        setTransactionNameSpy.callCount.should.equal(8);
        setTransactionNameSpy.args[0][0].should.equal('get/api/v1/resource/1');
        setTransactionNameSpy.args[1][0].should.equal('get/api/v1/resource/2');
        setTransactionNameSpy.args[2][0].should.equal('post/api/v1/resource/1');
        setTransactionNameSpy.args[3][0].should.equal('post/api/v1/resource/2');
        setTransactionNameSpy.args[4][0].should.equal('put/api/v1/resource/1');
        setTransactionNameSpy.args[5][0].should.equal('put/api/v1/resource/2');
        setTransactionNameSpy.args[6][0].should.equal('delete/api/v1/resource/1');
        setTransactionNameSpy.args[7][0].should.equal('delete/api/v1/resource/2');

        handlerSpy.callCount.should.equal(8);
        handlerSpy.args[6][0].should.equal(1);
        handlerSpy.args[6][1].should.equal(2);
        handlerSpy.args[6][2].should.equal(3);
        handlerSpy.args[7][0].should.equal(1);
        handlerSpy.args[7][1].should.equal(2);
        handlerSpy.args[7][2].should.equal(3);
    });

    it('should pass if the newrelic agent is not given', function* () {
        const { handlerSpy } = this;

        function getHandler() {
            return function* (...args) {
                return yield* (function* () {
                    handlerSpy(...args);
                    yield Promise.resolve();
                }());
            }
        }

        const routes = {
            get: {
                '/api/v1/resource/1': getHandler()
            }
        };

        const setTransactionNameSpy = this.sandbox.spy();

        newrelicRoutes(routes);

        yield* routes.get['/api/v1/resource/1']();

        setTransactionNameSpy.callCount.should.equal(0);
    });
});
