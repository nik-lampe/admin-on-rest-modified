'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxForm = require('redux-form');

var state = {};

exports.default = function () {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case _reduxForm.actionTypes.DESTROY:
          state[action.meta.form] = (state[action.meta.form] || 0) - 1;
          if (state[action.meta.form] <= 0) {
            return next(action);
          } else {
            // Drop the action
            return false;
          }
        case _reduxForm.actionTypes.INITIALIZE:
          state[action.meta.form] = (state[action.meta.form] || 0) + 1;
          return next(action);
        default:
          return next(action);
      }
    };
  };
};

module.exports = exports['default'];