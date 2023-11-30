export type CharacterItem = {
    id: string,
    name: string,
    image: string,
    status: string,
    species: string,
    type: string,
}

export interface CharacterResponse {
    info: {
      count: number;
      pages: number;
    };
    results: CharacterItem[];
}

export type DataCustom = {
  name?: string,
  age?: number,
  email?: string,
  password?: string,
  confirmPassword?: string,
  gender?: string,
  termsAndConditions?: boolean,
  country?: string,
  image?: string, 
}