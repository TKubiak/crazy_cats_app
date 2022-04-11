export interface CatApiObject {
  data: String[];
}

export class Cat {
  constructor(
    public description: String,
  ) { }
}