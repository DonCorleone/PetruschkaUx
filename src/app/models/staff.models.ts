export interface Staff {
	imageSrc: string;
	bio: string;
	name: string;
	topic: string;
	active: boolean;
	sortOrder: number;
}

export interface Job {
	isJobSharing: boolean;
	name: string;
	values: string[];
}
