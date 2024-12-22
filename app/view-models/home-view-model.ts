import { Observable } from '@nativescript/core';
import { AnimeService } from '../services/anime-service';
import { Anime } from '../models/anime.model';

export class HomeViewModel extends Observable {
    private animeService: AnimeService;
    private _popularAnime: Anime[] = [];
    private _isLoading: boolean = false;
    private _categories = [
        { name: 'Action' }, { name: 'Adventure' }, { name: 'Comedy' },
        { name: 'Drama' }, { name: 'Fantasy' }, { name: 'Horror' },
        { name: 'Mystery' }, { name: 'Romance' }, { name: 'Sci-Fi' },
        { name: 'Slice of Life' }, { name: 'Sports' }, { name: 'Supernatural' }
    ];

    constructor() {
        super();
        this.animeService = new AnimeService();
        this.loadPopularAnime();
    }

    get popularAnime(): Anime[] {
        return this._popularAnime;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get categories(): any[] {
        return this._categories;
    }

    async loadPopularAnime() {
        try {
            this._isLoading = true;
            this.notifyPropertyChange('isLoading', true);
            
            const animeList = await this.animeService.getTopAnime();
            this._popularAnime = animeList;
            this.notifyPropertyChange('popularAnime', this._popularAnime);
        } catch (error) {
            console.error('Error loading popular anime:', error);
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    async onSearch(args: any) {
        const searchBar = args.object;
        const searchTerm = searchBar.text;
        
        try {
            this._isLoading = true;
            this.notifyPropertyChange('isLoading', true);
            
            const results = await this.animeService.searchAnime(searchTerm);
            this._popularAnime = results;
            this.notifyPropertyChange('popularAnime', this._popularAnime);
        } catch (error) {
            console.error('Error searching anime:', error);
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    onAnimeTap(args: any) {
        const anime = this._popularAnime[args.index];
        console.log('Selected anime:', anime.title);
        // Navigate to detail page (to be implemented)
    }
}