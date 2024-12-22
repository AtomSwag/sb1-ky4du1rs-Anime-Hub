import { Http } from '@nativescript/core';
import { Anime, Episode, Category } from '../models/anime.model';

export class AnimeService {
    private baseUrl = 'https://api.jikan.moe/v4';

    async getTopAnime(page = 1): Promise<Anime[]> {
        try {
            const response = await Http.getJSON(`${this.baseUrl}/top/anime?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching top anime:', error);
            return [];
        }
    }

    async searchAnime(query: string): Promise<Anime[]> {
        try {
            const response = await Http.getJSON(`${this.baseUrl}/anime?q=${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error('Error searching anime:', error);
            return [];
        }
    }

    async getAnimeById(id: number): Promise<Anime> {
        try {
            const response = await Http.getJSON(`${this.baseUrl}/anime/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching anime details:', error);
            return null;
        }
    }

    async getAnimeEpisodes(id: number): Promise<Episode[]> {
        try {
            const response = await Http.getJSON(`${this.baseUrl}/anime/${id}/episodes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching episodes:', error);
            return [];
        }
    }

    async getAnimeByGenre(genreId: number, page = 1): Promise<Anime[]> {
        try {
            const response = await Http.getJSON(`${this.baseUrl}/anime?genres=${genreId}&page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching anime by genre:', error);
            return [];
        }
    }
}