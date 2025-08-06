export interface ActorMovie {
    id: number;
    title: string;
    posterUrl: string;
    character?: string;
}

export interface ActorDetails {
    id: number;
    name: string;
    biography: string;
    birthday: string;
    placeOfBirth?: string;
    photoUrl: string;
    imdbUrl?: string;
    movies: ActorMovie[];
}
