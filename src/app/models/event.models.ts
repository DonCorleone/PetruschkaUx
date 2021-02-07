export interface EventDetailEventInfo {
  id: number;
  eventId: number;
  languageId: number;
  name: string;
  organizerNameOnTickets: string;
  shortDescription: string;
  importantNotes: string;
  longDescription: string;
  artists: string;
  url: string;
  city: string;
  location: string;
  address: string;
  zipCode: string;
  bannerImagePath?: any;
  flyerImagePath?: any;
  bannerImage?: any;
  flyerImage?: any;
  organizerRemark?: any;
  posRemark?: any;
  googleMapLink?: any;
  dateCreated: Date;
  dateModified: Date;
}

export interface TicketTypeInfo {
  id: number;
  name: string;
  languageId: number;
  description?: any;
  imageUrl: string;
  image?: any;
  additionalFile?: any;
  additionalFileUrl: string;
  alternateImageUrl?: any;
  customtext1?: any;
  customtext2?: any;
  customtext3?: any;
  customtext4?: any;
  customtext1Mandatory: boolean;
  customtext2Mandatory: boolean;
  originalFileData?: any;
  originalImageData?: any;
  croppedImageData?: any;
  ticketTypeId: number;
  presentation?: any;
  deleted: boolean;
  emailSubject?: any;
  senderName?: any;
  modifiedDate: Date;
}

export interface TicketType {
  id: number;
  eventId: number;
  ticketsTotal: number;
  currency: string;
  price: number;
  start: Date;
  end: Date;
  vatTypeId: number;
  vatPercentage: number;
  maxMemberTickets: number;
  bookWithTicketTypeId: number;
  sortOrder: number;
  presaleStart: Date;
  presaleEnd: Date;
  openDoor: Date;
  invoiceEnd: Date;
  callcenterEnd: Date;
  sofortEnd: Date;
  promoCodeIdToPrint: number;
  ticketTemplate: string;
  maxNumberOfTicketsPerOrder: number;
  numberOfTicketsToBasket: number;
  festivalEventIds?: any;
  hidePriceOnTicket: boolean;
  hideOnPcClient: boolean;
  generateNoTicket: boolean;
  ticketByEmail: boolean;
  hideReceipt: boolean;
  noConfirmationEmail: boolean;
  useWorkflow: boolean;
  companyRequired: boolean;
  companyMandatory: boolean;
  firstNameRequired: boolean;
  firstNameMandatory: boolean;
  nameRequired: boolean;
  nameMandatory: boolean;
  emailRequired: boolean;
  emailMandatory: boolean;
  isActive: boolean;
  hideDateTime: boolean;
  isOverheadCalculateActive: boolean;
  numberOfTicketsSold: number;
  colorCode?: any;
  isSoldOut?: any;
  showImageOnTop?: any;
  blockAutoMailer: boolean;
  dontShowInsurance?: any;
  vatInGivenAmount?: any;
  senderEmail?: any;
  replyTo?: any;
  emailTemplate?: any;
  modifiedDate?: any;
  dateCreated?: any;
  hidePassbook?: any;
  externalTicketCode?: any;
  sendSMSOrder: boolean;
  phoneRequired: boolean;
  phoneMandatory: boolean;
  ticketTypeInfos: TicketTypeInfo[];
}

export interface EventDetail {
  _id: number;
  defaultLanguageId: number;
  organizerId: number;
  status: number;
  maxTickets: number;
  maxTicketsProOrder: number;
  countryId: number;
  openDoor: Date;
  start: Date;
  end: Date;
  eventGenreValue: number;
  googleCoordinates?: any;
  isActiveForSale?: any;
  googleAnalyticsTracker?: any;
  hideOnEventList: boolean;
  hideEventInfoOnSoldOut: boolean;
  dateCreated: Date;
  dateModified: Date;
  zoneMapId?: any;
  postSaleCloseStatus: number;
  masterEventId?: any;
  organizerGoogleAnalyticsDomain?: any;
  isCompanyNameMandatory: boolean;
  isPhoneMandatory: boolean;
  tenantId: number;
  locationId?: any;
  noVatOnCommission: boolean;
  shippingFee: number;
  sendNotificationByEmail: boolean;
  notificationEmail?: any;
  vatNumber?: any;
  sendWarning: boolean;
  salesWarningLevel: number;
  warningSendDate?: any;
  salesRegionId: number;
  emailTemplate?: any;
  showLinkToGoogleMap: boolean;
  latitude: number;
  longitude: number;
  facebookPixelId?: any;
  stay22Active: boolean;
  isBankInternalEvent: boolean;
  externalEventCode?: any;
  forceEmptySeats: number;
  eventInfos: EventDetailEventInfo[];
  ticketTypes: TicketType[];
}

export interface EventCalculationDefinition {
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
}
