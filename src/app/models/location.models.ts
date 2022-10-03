export interface EventLocation {
  _id: string;
  city: string;
  directions: string;
  info: string;
  name: string;
  postalCode: string;
  street: string;
  ef_id?: number;
}

export interface LocationIdName {
  name: string;
  ef_id?: number;
}
