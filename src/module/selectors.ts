const triggerBtn = '.ig-header-admin > button.al-trigger';
const modalForm = '#add_context_module_form';
const modalSubmit = '.form-controls button.submit_button';
const modalTitle = '#context_module_name'

export const listSelectors = {

  list: '#context_modules > .context_module'

};

export const moduleSelectors = {

  addModuleItemBtn: '.ig-header-admin button.add_module_item_link',
  admin: '.ig-header-admin > span.publish-icon',
  moduleItems: 'ul.items > li'

}

export const moduleItemSelectors = {

  addBtn: '.ui-dialog-buttonpane button.add_item_button',
  admin: '.ig-admin > span.publish-icon',
  modalContent: '#select_context_content_dialog',
  modalSelect: '#add_module_item_select',
  pageSelect: '#wiki_pages_select select'

}

export const captureSelector = '#content-wrapper';

export const createSelectors = {

  addBtn: 'button.add_module_link',
  form: modalForm,
  list: '#context_modules > .context_module',
  nameInput: modalTitle,
  submitBtn: modalSubmit

}

export const deleteSelectors = {

  delBtn: '.ig-header-admin a.delete_module_link',
  triggerBtn: triggerBtn

}

export const updateSelectors = {

  editBtn: '.ig-header-admin a.edit_module_link',
  form: modalForm,
  submitBtn: modalSubmit,
  titleInput: modalTitle,
  triggerBtn: triggerBtn

}