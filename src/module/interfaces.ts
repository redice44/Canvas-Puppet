import { Page } from '../page/interfaces';

export interface ModuleItem {

  id: number,
  // data: Page

}

export interface Module {

  title: string,
  items: ModuleItem[]

}
