"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationErrorCodes;
(function (NavigationErrorCodes) {
    NavigationErrorCodes["FAILED"] = "ERR_NAV_FAILED";
    NavigationErrorCodes["TIMEOUT"] = "ERR_NAV_TIMEOUT";
    NavigationErrorCodes["UNEXPECTED_DESTINATION"] = "ERR_NAV_UNEXPECTED_DESTINATION";
})(NavigationErrorCodes = exports.NavigationErrorCodes || (exports.NavigationErrorCodes = {}));
class NavigationError extends Error {
    constructor(message, code, url) {
        super(message);
        this.code = code;
        this.url = url;
    }
}
exports.NavigationError = NavigationError;
//# sourceMappingURL=navigation.js.map