import { useEffect, useState } from 'react';
import type { ActorDetails } from '../types/ActorDetails';

export function useActorDetails(id: string | undefined) {
    const [actorDetails, setActorDetails] = useState<ActorDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchActor = async () => {
            try {
                setLoading(true);
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const lang = 'fr-FR';

                const resPerson = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=${lang}`);
                const resCredits = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=${lang}`);

                if (!resPerson.ok || !resCredits.ok) throw new Error('Erreur lors du chargement des données.');

                const person = await resPerson.json();
                const credits = await resCredits.json();

                const movies = (credits.cast || [])
                    .filter((movie: any) => movie.poster_path)
                    .sort((a: any, b: any) => b.popularity - a.popularity)
                    .slice(0, 12)
                    .map((movie: any) => ({
                        id: movie.id,
                        title: movie.title,
                        character: movie.character,
                        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }));

                setActorDetails({
                    id: person.id,
                    name: person.name,
                    biography: person.biography,
                    birthday: person.birthday,
                    placeOfBirth: person.place_of_birth,
                    photoUrl: person.profile_path
                        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                        : '/portrait.png',
                    imdbUrl: person.imdb_id ? `https://www.imdb.com/name/${person.imdb_id}` : undefined,
                    movies,
                });
            } catch (err: any) {
                setError(err.message ?? 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        };

        fetchActor();
    }, [id]);

    return { actorDetails, loading, error };
}
