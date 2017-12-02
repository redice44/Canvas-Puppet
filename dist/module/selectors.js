"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const triggerBtn = '.ig-header-admin > button.al-trigger';
const modalForm = '#add_context_module_form';
const modalSubmit = '.form-controls button.submit_button';
const modalTitle = '#context_module_name';
exports.listSelectors = {
    list: '#context_modules > .context_module'
};
exports.moduleSelectors = {
    addModuleItemBtn: '.ig-header-admin button.add_module_item_link',
    admin: '.ig-header-admin > span.publish-icon',
    moduleItems: 'ul.items > li'
};
exports.moduleItemSelectors = {
    addBtn: '.ui-dialog-buttonpane button.add_item_button',
    admin: '.ig-admin > span.publish-icon',
    modalContent: '#select_context_content_dialog',
    modalSelect: '#add_module_item_select',
    pageSelect: '#wiki_pages_select select'
};
exports.captureSelector = '#content-wrapper';
exports.createSelectors = {
    addBtn: 'button.add_module_link',
    form: modalForm,
    list: '#context_modules > .context_module',
    nameInput: modalTitle,
    submitBtn: modalSubmit
};
exports.deleteSelectors = {
    delBtn: '.ig-header-admin a.delete_module_link',
    triggerBtn: triggerBtn
};
exports.updateSelectors = {
    editBtn: '.ig-header-admin a.edit_module_link',
    form: modalForm,
    submitBtn: modalSubmit,
    titleInput: modalTitle,
    triggerBtn: triggerBtn
};
//# sourceMappingURL=selectors.js.map