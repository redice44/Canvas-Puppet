"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function clickAndNav(page, selector, navOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return page.click(selector).then(() => page.waitForNavigation(navOptions));
        // return Promise.all( [
        //   page.waitForNavigation( navOptions ),
        //   page.click( selector )
        // ] )
        // .then( (value: [ Puppeteer.Response, void ] ) => {
        //   return value[ 0 ];
        // } );
    });
}
exports.default = clickAndNav;
//# sourceMappingURL=clickAndNav.js.map