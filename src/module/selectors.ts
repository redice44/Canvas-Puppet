export const selectors = {
  modulesContainer: '#context_modules_sortable_container',
  primaryModules: '#context_modules > .context_module',
  moduleTitle: '#context_modules > .context_module:nth-child(INDEX) .header span.name',
  contentItems: '#context_modules > .context_module:nth-child(INDEX) > .content > ul > li',
  contentLink: '#context_modules > .context_module:nth-child(INDEX) > .content > ul > li:nth-child(INDEX2) .module-item-title > span > a.title',
  contentType: '#context_modules > .context_module:nth-child(INDEX) > .content > ul > li:nth-child(INDEX2)',
};

export const itemTypes = [
  {
    className: 'wiki_page',
    type: 'page'
  }, {
    className: 'external_url',
    type: 'link'
  }, {
    className: 'attachment',
    type: 'file'
  }, {
    className: 'discussion_topic',
    type: 'discussion'
  }, {
    className: 'assignment',
    type: 'assignment'
  }, {
    className: 'quiz',
    type: 'quiz'
  }, {
    className: 'context_module_sub_header',
    type: 'header'
  }, {
    className: 'context_external_tool',
    type: 'tool'
  }
];