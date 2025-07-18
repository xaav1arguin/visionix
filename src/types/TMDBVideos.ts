export interface TMDBVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    iso_639_1: string;
    iso_3166_1: string;
    official: boolean;
    published_at: string;
}

export interface TMDBVideos {
    id: number;
    results: TMDBVideo[];
}
