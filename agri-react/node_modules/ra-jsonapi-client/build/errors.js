'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotImplementedError = exports.NotImplementedError = function (_Error) {
  _inherits(NotImplementedError, _Error);

  function NotImplementedError(message) {
    _classCallCheck(this, NotImplementedError);

    var _this = _possibleConstructorReturn(this, (NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call(this, message));

    _this.message = message;
    _this.name = 'NotImplementedError';
    return _this;
  }

  return NotImplementedError;
}(Error);

var HttpError = exports.HttpError = function (_Error2) {
  _inherits(HttpError, _Error2);

  function HttpError(message, status) {
    _classCallCheck(this, HttpError);

    var _this2 = _possibleConstructorReturn(this, (HttpError.__proto__ || Object.getPrototypeOf(HttpError)).call(this, message));

    _this2.message = message;
    _this2.status = status;
    _this2.name = 'HttpError';
    return _this2;
  }

  return HttpError;
}(Error);