// Product Types
export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: File | undefined;
}

export interface Customer {
  full_name: string;
  email: string;
  address: string;
  state: string;
  city: string;
  zip_code: string;
  country?: string;
}

export interface ProductActionType {
  //onSubmit: (product: Product, action?: string) => void;
  product: any;
  action?: string
}

export type ErrorMap = Map<string, string>;
