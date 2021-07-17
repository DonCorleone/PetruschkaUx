export interface Event {
	event: string;
	share: number;
}

export interface Sponsor {
	events: Event[];
	image: string;
	name: string;
	url: string;
}

export interface SponsorsData {
	sponsors: Sponsor[];
}

export interface SponsorsResponse {
	data: SponsorsData;
}
