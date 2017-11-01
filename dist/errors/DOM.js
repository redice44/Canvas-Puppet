"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMErrorCodes;
(function (DOMErrorCodes) {
    DOMErrorCodes["EMPTY_SELECTOR"] = "ERR_DOM_SELECTOR_EMPTY";
    DOMErrorCodes["SELECTOR_NOT_FOUND"] = "ERR_DOM_SELECTOR_404";
})(DOMErrorCodes = exports.DOMErrorCodes || (exports.DOMErrorCodes = {}));
class DOMError extends Error {
    constructor(message, code, selector = '') {
        super(message);
        this.code = code;
        this.selector = selector;
    }
}
exports.DOMError = DOMError;
//# sourceMappingURL=DOM.js.map