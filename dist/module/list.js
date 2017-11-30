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
const selectors_1 = require("./selectors");
function getModuleList(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const getTitle = (moduleEl) => moduleEl.querySelector('.header span.name').innerHTML.trim();
        const getModuleItem = (moduleEl) => {
            if (moduleEl.classList.contains('context_module_sub_header')) {
                return null;
            }
            return {
                id: parseInt(moduleEl.querySelector('.ig-admin > span').getAttribute('data-module-item-id')),
                title: moduleEl.querySelector('.ig-info span.locked_title').getAttribute('title').trim()
            };
        };
        const modulesEH = yield page.$$(selectors_1.selectors.primaryModules);
        const modules = [];
        for (let i = 0; i < modulesEH.length; i++) {
            const title = yield page.evaluate(getTitle, modulesEH[i]);
            const itemsEH = yield modulesEH[i].$$('ul.items > li');
            const items = [];
            for (let j = 0; j < itemsEH.length; j++) {
                const item = yield page.evaluate(getModuleItem, itemsEH[j]);
                if (item) {
                    items.push(item);
                }
            }
            modules.push({
                title: title,
                items: items
            });
        }
        return modules;
    });
}
exports.default = getModuleList;
//# sourceMappingURL=list.js.map