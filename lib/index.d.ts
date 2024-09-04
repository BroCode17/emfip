// Product Types
export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
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
