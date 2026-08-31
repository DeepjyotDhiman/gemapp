export type GemstoneCategory = 
  | "Ruby"
  | "Emerald"
  | "Blue Sapphire"
  | "Yellow Sapphire"
  | "Pearl"
  | "Red Coral"
  | "Hessonite"
  | "Cat's Eye";

export type AvailabilityStatus = "in_stock" | "on_request";

export interface Gemstone {
  id: string;
  slug: string;
  name: string;
  category: GemstoneCategory;
  hindiName?: string;
  price: number; // in INR
  weight: string; // e.g. "4.25 Carats (4.67 Ratti)"
  caratWeight?: number;
  rattiWeight?: number;
  availability: AvailabilityStatus;
  images: string[];
  dimensions?: string; // e.g. "10.2 x 8.4 x 5.1 mm"
  shapeCut: string; // e.g. "Cushion Brilliant"
  color: string; // e.g. "Pigeon Blood Red"
  origin?: string; // e.g. "Mozambique" or undefined for "Information coming soon"
  treatment?: string; // e.g. "Unheated / Untreated" or undefined
  certification?: string; // e.g. "Government Recognised Gem Testing Lab Certificate"
  description: string;
  isFeatured?: boolean;
}

export interface CartItem {
  gemstone: Gemstone;
  quantity: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  message?: string;
}

export interface OrderRequest {
  id: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  totalAmount: number;
  createdAt: string;
  status: "pending_confirmation" | "confirmed";
}
