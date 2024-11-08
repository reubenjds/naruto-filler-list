// place files you want to import through the `$lib` alias in this folder.

export type Episode = {
	number: number;
	title: string;
	type: string;
	explanation?: string;
};

export type Arc = {
	name: string;
	episode_start: number;
	episode_end: number;
};

export type QuickList = {
	Manga_Canon_Episodes: string[];
	Mixed_Canon_Filler_Episodes: string[];
	Filler_Episodes: string[];
};
