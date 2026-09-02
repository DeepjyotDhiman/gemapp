import { RudrakshaItem } from "@/types/rudraksha";
import { getImagePath } from "@/utils/image";

export const RUDRAKSHA_CATEGORIES = [
  "1 Mukhi",
  "2 Mukhi",
  "3 Mukhi",
  "4 Mukhi",
  "5 Mukhi",
  "6 Mukhi",
  "7 Mukhi",
  "8 Mukhi",
  "9 Mukhi",
  "10 Mukhi",
  "11 Mukhi",
  "12 Mukhi",
  "13 Mukhi",
  "14 Mukhi",
  "Rudraksha Mala",
  "Rudraksha Bracelet",
  "Rudraksha Accessories",
] as const;

export const SAMPLE_RUDRAKSHA: RudrakshaItem[] = [
  {
    id: "rud-001",
    slug: "1-mukhi-rudraksha-specimen",
    name: "1 Mukhi Rudraksha Specimen",
    category: "1 Mukhi",
    hindiName: "Ek Mukhi Rudraksha",
    availability: "in_stock",
    images: [getImagePath("/images/rudraksha/1-mukhi.jpg")],
    description: "Authentic single-cleft natural Rudraksha bead specimen.",
    isFeatured: true,
  },
  {
    id: "rud-002",
    slug: "2-mukhi-rudraksha-specimen",
    name: "2 Mukhi Rudraksha Specimen",
    category: "2 Mukhi",
    hindiName: "Do Mukhi Rudraksha",
    availability: "in_stock",
    images: [getImagePath("/images/rudraksha/2-mukhi.jpg")],
    description: "Natural two-faced Rudraksha bead with distinct vertical lines.",
    isFeatured: true,
  },
  {
    id: "rud-003",
    slug: "5-mukhi-rudraksha-mala-108-beads",
    name: "5 Mukhi Natural Rudraksha Mala (108 Beads)",
    category: "Rudraksha Mala",
    hindiName: "Panch Mukhi Mala",
    availability: "in_stock",
    images: [getImagePath("/images/rudraksha/mala.jpg")],
    description: "Traditional 108-bead natural 5 Mukhi Rudraksha rosary for daily wear.",
    isFeatured: true,
  },
  {
    id: "rud-004",
    slug: "7-mukhi-rudraksha-specimen",
    name: "7 Mukhi Rudraksha Specimen",
    category: "7 Mukhi",
    hindiName: "Saat Mukhi Rudraksha",
    availability: "in_stock",
    images: [getImagePath("/images/rudraksha/7-mukhi.jpg")],
    description: "Natural seven-cleft Rudraksha bead with well-defined facial grooves.",
    isFeatured: true,
  },
  {
    id: "rud-005",
    slug: "rudraksha-bead-bracelet-silver-casing",
    name: "Natural Rudraksha Adjustable Bracelet",
    category: "Rudraksha Bracelet",
    hindiName: "Rudraksha Kangan",
    availability: "in_stock",
    images: [getImagePath("/images/rudraksha/bracelet.jpg")],
    description: "Handcrafted natural Rudraksha bead wristband designed for comfort.",
    isFeatured: true,
  },
  {
    id: "rud-006",
    slug: "12-mukhi-rudraksha-specimen",
    name: "12 Mukhi Rudraksha Specimen",
    category: "12 Mukhi",
    hindiName: "Barah Mukhi Rudraksha",
    availability: "on_request",
    images: [getImagePath("/images/rudraksha/12-mukhi.jpg")],
    description: "Twelve-faced natural Rudraksha bead specimen available upon enquiry.",
    isFeatured: false,
  },
  {
    id: "rud-007",
    slug: "14-mukhi-rare-rudraksha-specimen",
    name: "14 Mukhi Rare Rudraksha Specimen",
    category: "14 Mukhi",
    hindiName: "Chaudah Mukhi Rudraksha",
    availability: "on_request",
    images: [getImagePath("/images/rudraksha/14-mukhi.jpg")],
    description: "Collector-grade fourteen-cleft natural Rudraksha bead specimen.",
    isFeatured: false,
  },
];

export async function getAllRudraksha(): Promise<RudrakshaItem[]> {
  return SAMPLE_RUDRAKSHA;
}

export async function getFeaturedRudraksha(): Promise<RudrakshaItem[]> {
  return SAMPLE_RUDRAKSHA.filter((r) => r.isFeatured);
}
