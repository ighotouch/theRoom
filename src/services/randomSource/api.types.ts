export interface IAnime {
  id: string;
  type: string;
  links: {
    self: string;
  };
  punchline: string;
  attributes: IAnimeAttributes;
}


export interface IAnimeAttributes {
    createdAt: string;
    updatedAt: string;
    slug: string;
    synopsis: string;
    description: string;
    coverImageTopOffset: string;
    canonicalTitle: string;
    averageRating: string;
    userCount: number;
    posterImage: {
        tiny: string;
        small: string;
        medium: string;
    }
    coverImage:{
        tiny: string;
    }
}


export interface IAnimeResponse {
    status?: number;
    data?: Array<IAnime>;
  }
