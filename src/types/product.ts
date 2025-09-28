export type Product = {
  name: string;
  productName: string;
  brandName: string | null;
  unit: string | null;
  minPurchaseQty: number;
  discountType: "Percent" | "Fixed" | string;
  discountPercent: number;
  discountAmount: number;
  price: string | null;          // formatted price string from fmt_money
  discountedPrice: string | null;
  stock: number;
  productSlug: string;
  productTag: string | null;
  productRating: number;
  ratingCount: number;
  ndText: string | null;
  featured: number;              // 0 or 1
  productImage1: string | null;
  productImage2: string | null;
  productCategory: string[];
  unitsSold?: number;
  shortDescription?: string;
};
