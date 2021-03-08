export interface Staff {
	bio: string;
	name: string;
	topic: string;
	active: boolean;
	sortOrder: number;
}

export interface Job {
	name: string;
	jobsharers: string[];
}
