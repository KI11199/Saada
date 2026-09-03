export type Language = 'ar' | 'en';

export interface ProductOption {
  weight: string;
  labelAr: string;
  labelEn: string;
  price: number;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  subTitleAr: string;
  subTitleEn: string;
  category: 'henna' | 'sidr' | 'mshat' | 'dateseed' | 'bundles';
  price: number;
  originalPrice?: number;
  weight: string;
  sizes: ProductOption[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badgeAr?: string;
  badgeEn?: string;
  colorPalette: {
    accent: string;
    powder: string;
    badgeBg: string;
    badgeText: string;
  };
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  descriptionAr: string;
  descriptionEn: string;
  benefitsAr: string[];
  benefitsEn: string[];
  ingredientsAr: string[];
  ingredientsEn: string[];
  howToUseAr: { step: string; instruction: string }[];
  howToUseEn: { step: string; instruction: string }[];
  expertTipsAr: string;
  expertTipsEn: string;
  suitableForAr: string;
  suitableForEn: string;
  imageUrl: string;
  secondaryImageUrl: string;
  tagsAr: string[];
  tagsEn: string[];
}

export interface CartItem {
  id: string; // product.id + size index
  product: Product;
  selectedSize: ProductOption;
  quantity: number;
}

export interface FAQItem {
  id: string;
  category: 'safety' | 'usage' | 'sourcing' | 'ordering';
  categoryTitleAr: string;
  categoryTitleEn: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface GalleryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'products' | 'rituals' | 'sourcing' | 'texture';
  imageUrl: string;
  captionAr: string;
  captionEn: string;
}

export interface SourcingPillar {
  iconName: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  detailAr: string;
  detailEn: string;
}

export interface CustomerOrderInfo {
  fullName: string;
  phoneNumber: string;
  country: string;
  city: string;
  districtAddress: string;
  deliveryNotes?: string;
  preferredContact: 'whatsapp' | 'call';
}
