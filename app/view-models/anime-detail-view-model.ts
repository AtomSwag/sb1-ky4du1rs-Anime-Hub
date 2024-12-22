import { Observable, NavigatedData, Frame } from '@nativescript/core';
import { AnimeService } from '../services/anime-service';
import { VideoService } from '../services/video-service';
import { Anime, Episode } from '../models/anime.model';

export class AnimeDetailViewModel extends Observable {
    private animeService: AnimeService;
    private videoService: VideoService;
    private _anime: Anime;
    private _episodes: Episode[] = [];
    private _selectedQuality: string = '1080';
    private _currentEpisodeUrl: string = '';
    private _hasEpisodes: boolean = false;

    constructor(private animeId: number) {
        super();
        this.animeService = new AnimeService();
        this.videoService = new VideoService();
        this.loadAnimeDetails();
    }

    async loadAnimeDetails() {
        const anime = await this.animeService.getAnimeById(this.animeId);
        this._anime = anime;
        this.notifyPropertyChange('anime', this._anime);

        if (anime.episodes > 0) {
            this._episodes = await this.animeService.getAnimeEpisodes(this.animeId);
            this._hasEpisodes = true;
            this.notifyPropertyChange('episodes', this._episodes);
            this.notifyPropertyChange('hasEpisodes', this._hasEpisodes);
        }
    }

    get anime(): Anime {
        return this._anime;
    }

    get episodes(): Episode[] {
        return this._episodes;
    }

    get hasEpisodes(): boolean {
        return this._hasEpisodes;
    }

    get selectedQuality(): string {
        return this._selectedQuality;
    }

    get currentEpisodeUrl(): string {
        return this._currentEpisodeUrl;
    }

    onBackButtonTap() {
        Frame.topmost().goBack();
    }

    async selectQuality(args: any) {
        const button = args.object;
        this._selectedQuality = button.quality;
        this.notifyPropertyChange('selectedQuality', this._selectedQuality);
        
        if (this._currentEpisodeUrl) {
            await this.updateVideoUrl();
        }
    }

    async onEpisodeTap(args: any) {
        const episode = this._episodes[args.index];
        await this.updateVideoUrl(episode.id);
    }

    private async updateVideoUrl(episodeId?: number) {
        if (episodeId) {
            this._currentEpisodeUrl = await this.videoService.getVideoUrl(episodeId, this._selectedQuality);
            this.notifyPropertyChange('currentEpisodeUrl', this._currentEpisodeUrl);
        }
    }
}