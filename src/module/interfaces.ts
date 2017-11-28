import { Page } from '../page/interfaces';

export interface ModuleItem {

  id: number,
  title: string
  // data: Page

}

export interface Module {

  title: string,
  items: ModuleItem[]

}
