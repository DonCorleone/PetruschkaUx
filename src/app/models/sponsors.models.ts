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

export interface SponsorExtended extends Sponsor {
	share : number;
	imagePath: string;
}
