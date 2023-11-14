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