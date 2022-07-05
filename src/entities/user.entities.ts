export type GeoModel = {
  lat: string
  lng: string
}

export interface AddressModel {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoModel;
}

export interface CompanyModel extends Pick<UserModel, 'name'> {
  catchPhrase: string;
  bs: string;
}

export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressModel;
  phone: string;
  website: string;
  company: CompanyModel 
}