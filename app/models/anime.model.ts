export interface Anime {
    mal_id: number;
    title: string;
    title_english: string;
    images: {
        jpg: {
            image_url: string;
            large_image_url: string;
        }
    };
    synopsis: string;
    score: number;
    episodes: number;
    status: string;
    genres: Array<{ name: string }>;
}

export interface Episode {
    id: number;
    number: number;
    title: string;
}

export interface Category {
    id: number;
    name: string;
    count: number;
}