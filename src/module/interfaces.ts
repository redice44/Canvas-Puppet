
export interface ModuleItem {

  itemId: number,
  moduleId?: number,
  title: string,
  type: string

}

export interface Module {

  id?: number,
  title: string,
  items: ModuleItem[]

}
