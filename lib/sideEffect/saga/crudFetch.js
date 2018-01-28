'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _fetchActions = require('../../actions/fetchActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crudFetch = function crudFetch(restClient) {
    var _marked = /*#__PURE__*/_regenerator2.default.mark(handleFetch);

    function handleFetch(action) {
        var type, payload, _action$meta, fetchMeta, cancelPrevious, meta, restType, response;

        return _regenerator2.default.wrap(function handleFetch$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, _action$meta = action.meta, fetchMeta = _action$meta.fetch, cancelPrevious = _action$meta.cancelPrevious, meta = (0, _objectWithoutProperties3.default)(_action$meta, ['fetch', 'cancelPrevious']);
                        restType = fetchMeta;

                        if (!cancelPrevious) {
                            _context.next = 5;
                            break;
                        }

                        _context.next = 5;
                        return (0, _effects.call)(_reduxSaga.delay, 500);

                    case 5:
                        _context.next = 7;
                        return (0, _effects.all)([(0, _effects.put)({ type: type + '_LOADING', payload: payload, meta: meta }), (0, _effects.put)({ type: _fetchActions.FETCH_START })]);

                    case 7:
                        response = void 0;
                        _context.prev = 8;
                        _context.next = 11;
                        return (0, _effects.call)(restClient, restType, meta.resource, payload);

                    case 11:
                        response = _context.sent;

                        if (response.data) {
                            _context.next = 14;
                            break;
                        }

                        throw new Error('REST response must contain a data key');

                    case 14:
                        _context.next = 16;
                        return (0, _effects.put)({
                            type: type + '_SUCCESS',
                            payload: response,
                            requestPayload: payload,
                            meta: (0, _extends3.default)({}, meta, {
                                fetchResponse: restType,
                                fetchStatus: _fetchActions.FETCH_END
                            })
                        });

                    case 16:
                        _context.next = 18;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_END });

                    case 18:
                        _context.next = 26;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context['catch'](8);
                        _context.next = 24;
                        return (0, _effects.put)({
                            type: type + '_FAILURE',
                            error: _context.t0.message ? _context.t0.message : _context.t0,
                            payload: _context.t0.body ? _context.t0.body : null,
                            requestPayload: payload,
                            meta: (0, _extends3.default)({}, meta, {
                                fetchResponse: restType,
                                fetchStatus: _fetchActions.FETCH_ERROR
                            })
                        });

                    case 24:
                        _context.next = 26;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_ERROR, error: _context.t0 });

                    case 26:
                        _context.prev = 26;
                        _context.next = 29;
                        return (0, _effects.cancelled)();

                    case 29:
                        if (!_context.sent) {
                            _context.next = 33;
                            break;
                        }

                        _context.next = 32;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_CANCEL });

                    case 32:
                        return _context.abrupt('return');

                    case 33:
                        return _context.finish(26);

                    case 34:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this, [[8, 20, 26, 34]]);
    }

    return (/*#__PURE__*/_regenerator2.default.mark(function watchCrudFetch() {
            return _regenerator2.default.wrap(function watchCrudFetch$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.all)([(0, _effects.takeLatest)(function (action) {
                                return action.meta && action.meta.fetch && action.meta.cancelPrevious;
                            }, handleFetch), (0, _effects.takeEvery)(function (action) {
                                return action.meta && action.meta.fetch && !action.meta.cancelPrevious;
                            }, handleFetch)]);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watchCrudFetch, this);
        })
    );
};

exports.default = crudFetch;
module.exports = exports['default'];