import { AvailabilityStatus } from "./gemstone";

export type RudrakshaCategory =
  | "1 Mukhi"
  | "2 Mukhi"
  | "3 Mukhi"
  | "4 Mukhi"
  | "5 Mukhi"
  | "6 Mukhi"
  | "7 Mukhi"
  | "8 Mukhi"
  | "9 Mukhi"
  | "10 Mukhi"
  | "11 Mukhi"
  | "12 Mukhi"
  | "13 Mukhi"
  | "14 Mukhi"
  | "Rudraksha Mala"
  | "Rudraksha Bracelet"
  | "Rudraksha Accessories"
  | string;

export interface RudrakshaItem {
  id: string;
  slug: string;
  name: string;
  category: RudrakshaCategory;
  hindiName?: string;
  price?: number;
  weight?: string;
  origin?: string;
  availability: AvailabilityStatus;
  images: string[];
  description: string;
  isFeatured?: boolean;
}
