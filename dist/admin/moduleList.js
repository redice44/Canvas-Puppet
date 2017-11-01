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
const modules_1 = require("../config/selectors/modules");
const goto_1 = require("../utility/goto");
function getModuleList(page, rootUrl, course) {
    return __awaiter(this, void 0, void 0, function* () {
        const modulesUrl = `${rootUrl}/courses/${course.id}/modules`;
        yield goto_1.default(page, modulesUrl);
        const numModules = yield page.$$eval(modules_1.selectors.primaryModules, modules => modules.length);
        const modules = [];
        for (let i = 1; i <= numModules; i++) {
            modules.push(yield getModule(page, i));
        }
        return modules;
    });
}
exports.default = getModuleList;
function getModule(page, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const moduleItems = {
            title: '',
            items: []
        };
        moduleItems.title = yield page.$eval(modules_1.selectors.moduleTitle.replace('INDEX', '' + index), (el) => el.innerHTML.trim());
        const numItems = yield page.$$eval(modules_1.selectors.contentItems.replace('INDEX', '' + index), items => items.length);
        // console.log(`  Module: ${moduleItems.title}`);
        for (let i = 1; i <= numItems; i++) {
            const item = {
                title: '',
                link: '',
                type: ''
            };
            item.title = yield page.$eval(modules_1.selectors.contentLink.replace('INDEX', '' + index).replace('INDEX2', '' + i), (el) => el.innerHTML.trim());
            item.link = yield page.$eval(modules_1.selectors.contentLink.replace('INDEX', '' + index).replace('INDEX2', '' + i), (el) => el.getAttribute('href').trim());
            const itemClasses = yield page.mainFrame().$eval(modules_1.selectors.contentType.replace('INDEX', '' + index).replace('INDEX2', '' + i), (item) => {
                let classes = [];
                for (let i = 0; i < item.classList.length; i++) {
                    classes.push(item.classList[i]);
                }
                return classes;
            });
            for (let i = 0; i < modules_1.itemTypes.length; i++) {
                if (itemClasses.includes(modules_1.itemTypes[i].className)) {
                    item.type = modules_1.itemTypes[i].type;
                    break;
                }
            }
            moduleItems.items.push(item);
        }
        return moduleItems;
    });
}
//# sourceMappingURL=moduleList.js.map