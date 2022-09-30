export interface EventDetailEventInfo {
	// id: number;
	// eventId: number;
	languageId: number;
	name: string;
	// organizerNameOnTickets: string;
	shortDescription: string;
	importantNotes: string;
	longDescription: string;
	artists: string;
	url: string;
	// city: string;
	location: string;
	// address: string;
	// zipCode: string;
	bannerImagePath?: any;
	flyerImagePath?: any;
	// bannerImage?: any;
	// flyerImage?: any;
	// organizerRemark?: any;
	// posRemark?: any;
	// googleMapLink?: any;
	// dateCreated: Date;
	// dateModified: Date;
}

export interface TicketTypeInfo {
	// id: number;
	name: string;
	languageId: number;
	description?: any;
	imageUrl: string;
	// image?: any;
	// additionalFile?: any;
	// additionalFileUrl: string;
	// alternateImageUrl?: any;
	// customtext1?: any;
	// customtext2?: any;
	// customtext3?: any;
	// customtext4?: any;
	// customtext1Mandatory: boolean;
	// customtext2Mandatory: boolean;
	// originalFileData?: any;
	// originalImageData?: any;
	// croppedImageData?: any;
	// ticketTypeId: number;
	// presentation?: any;
	// deleted: boolean;
	// emailSubject?: any;
	// senderName?: any;
	// modifiedDate: Date;
}

export interface TicketType {
	// id: number;
	// eventId: number;
	// ticketsTotal: number;
	currency: string;
	price: number;
	// start: Date;
	// end: Date;
	// vatTypeId: number;
	// vatPercentage: number;
	// maxMemberTickets: number;
	// bookWithTicketTypeId: number;
	// sortOrder: number;
	preSaleStart: Date;
	// preSaleEnd: Date;
	// openDoor: Date;
	// invoiceEnd: Date;
	// callcenterEnd: Date;
	// sofortEnd: Date;
	// promoCodeIdToPrint: number;
	// ticketTemplate: string;
	// maxNumberOfTicketsPerOrder: number;
	// numberOfTicketsToBasket: number;
	// festivalEventIds?: any;
	// hidePriceOnTicket: boolean;
	// hideOnPcClient: boolean;
	// generateNoTicket: boolean;
	// ticketByEmail: boolean;
	// hideReceipt: boolean;
	// noConfirmationEmail: boolean;
	// useWorkflow: boolean;
	// companyRequired: boolean;
	// companyMandatory: boolean;
	// firstNameRequired: boolean;
	// firstNameMandatory: boolean;
	// nameRequired: boolean;
	// nameMandatory: boolean;
	// emailRequired: boolean;
	// emailMandatory: boolean;
	// isActive: boolean;
	// hideDateTime: boolean;
	// isOverheadCalculateActive: boolean;
	// numberOfTicketsSold: number;
	// colorCode?: any;
	// isSoldOut?: any;
	// showImageOnTop?: any;
	// blockAutoMailer: boolean;
	// dontShowInsurance?: any;
	// vatInGivenAmount?: any;
	// senderEmail?: any;
	// replyTo?: any;
	// emailTemplate?: any;
	// modifiedDate?: any;
	// dateCreated?: any;
	// hidePassbook?: any;
	// externalTicketCode?: any;
	// sendSMSOrder: boolean;
	// phoneRequired: boolean;
	// phoneMandatory: boolean;
	ticketTypeInfos: TicketTypeInfo[];
}

export interface EventDetail {
	_id: number;
	// defaultLanguageId: number;
	// organizerId: number;
	// status: number;
	// maxTickets: number;
	// maxTicketsProOrder: number;
	// countryId: number;
	// openDoor: Date;
	start: Date;
	// end: Date;
	// eventGenreValue: number;
	// googleCoordinates?: any;
	// isActiveForSale?: any;
	googleAnalyticsTracker?: any;
	// hideOnEventList: boolean;
	// hideEventInfoOnSoldOut: boolean;
	// dateCreated: Date;
	// dateModified: Date;
	// zoneMapId?: any;
	// postSaleCloseStatus: number;
	// masterEventId?: any;
	// organizerGoogleAnalyticsDomain?: any;
	// isCompanyNameMandatory: boolean;
	// isPhoneMandatory: boolean;
	// tenantId: number;
	// locationId?: any;
	// noVatOnCommission: boolean;
	// shippingFee: number;
	// sendNotificationByEmail: boolean;
	// notificationEmail?: any;
	// vatNumber?: any;
	// sendWarning: boolean;
	// salesWarningLevel: number;
	// warningSendDate?: any;
	// salesRegionId: number;
	// emailTemplate?: any;
	// showLinkToGoogleMap: boolean;
	// latitude: number;
	// longitude: number;
	facebookPixelId?: string;
	// stay22Active: boolean;
	// isBankInternalEvent: boolean;
	// externalEventCode?: any;
	// forceEmptySeats: number;
	eventInfos: EventDetailEventInfo[];
	ticketTypes: TicketType[];
}

/*export interface EventInfo {
		flyerImagePath: string;
		importantNotes: string;
		languageId: number;
		name: string;
		shortDescription: string;
}*/

export interface GetEventInfoById {
	eventDetail: EventDetail;
	notificationEmail: string;
}




export interface TicketPrice {
	name:string,
	currency:string,
	price:number
}

export interface EventDetailViewModel {
		eventDetail: EventDetail;
}

export interface UpcomingEventDetailsResponse {
		nextGigPerUpcomingEvent: EventDetailViewModel[];
}

/*export interface EventCalculationDefinition {
	currency: string;
	fromAmount: number;
	toAmount: number;
	clickPrice: number;
	commission: number;
	vat: number;
	organizerId?: any;
	eventId?: any;
}


export interface EventEventGroupUsageEvent {
	__typename: string;
	eventGroupId: number;
}*/
/*
query GetUpcomingGigs($today: DateTime!) {
	eventDetails(sortBy: START_ASC, query: {start_gte: $today}) {
		_id
		eventInfos {
			name
			location
			languageId
			url
			__typename
		}
		ticketTypes {
			sortOrder
			price
			currency
			preSaleStart
			ticketTypeInfos {
				name
				languageId
				__typename
			}
			__typename
		}
		start
		googleAnalyticsTracker
		__typename
	}
}*/
/*
{
	now: '$$NOW'
}
{
	diff: {
		$dateDiff: {
			startDate: '$start',
				endDate: '$now',
				unit: 'day'
		}
	}
}

{
	diff: {
		$lte: 0
	}
}

/!**
 * specifications: The fields to
 *   include or exclude.
 *!/
{
	start: 1,
		googleAnalyticsTracker: 1,
	"eventInfos.name": 1,
	"eventInfos.location": 1,
	"eventInfos.languageId": 1,
	"eventInfos.url": 1,
	"ticketTypes.sortOrder": 1,
	"ticketTypes.currency": 1,
	"ticketTypes.price": 1,
	"ticketTypes.preSaleStart": 1,
	"ticketTypes.ticketTypeInfos.name": 1,
	"ticketTypes.ticketTypeInfos.languageId": 1
}
*/
