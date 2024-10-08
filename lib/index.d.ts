// Product Types
export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: File | undefined;
  // this field is for update purpose
  imageId?: string;
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


/** App State */
// Define the possible order statuses
type OrderStatus = 'SHIPPED' | 'PENDING' | 'DELIVERED' | 'CANCELLED';

// Define the structure for an order item
export interface OrderItem {
  $id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  image?: any;
  set?: string;
  name: string;
  price: number

}

// Define the structure for customer information
export interface CustomerTypes {
  full_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

// Define the structure for order information
export interface Order {
  order_date: string;
  total_amount: number;
  status: OrderStatus;
}

// Define the main structure that combines all the above
export interface OrderData {
  orders: Order;
  customers: Customer;
  orderItems: OrderItem[];
}
export interface TermsOfService {
  id: string;
  version: string;
  lastUpdated: Date;
  acceptanceClause: string;
  userObligations: string[];
  intellectualPropertyRights: string;
  productDescriptions: string;
  pricingAndPayment: string;
  shippingAndDelivery: string;
  returnsAndRefunds: string;
  limitationOfLiability: string;
  disputeResolution: string;
  terminationClause: string;
  governingLaw: string;
  contactInformation: {
    email: string;
    phone?: string;
    address: string;
  };
}


export interface PrivacyPolicy {
  id: string;
  version: string;
  lastUpdated: Date;
  introductionStatement: string;
  dataCollected: string[];
  dataUsage: string[];
  dataSharing: string[];
  cookiesPolicy: string;
  userRights: string[];
  dataRetention: string;
  dataProtectionMeasures: string;
  thirdPartyLinks: string;
  childrenPrivacy: string;
  internationalDataTransfers?: string;
  policyChanges: string;
  contactInformation: {
    email: string;
    phone?: string;
    address: string;
  };
  gdprCompliance?: {
    dataController: string;
    legalBasis: string[];
    dataSubjectRights: string[];
  };
  ccpaCompliance?: {
    californiaResidentRights: string[];
    saleOfPersonalInformation: string;
  };
}