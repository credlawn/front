import { api } from "@/lib/fetch";
import { Product, SingleProduct } from "@/types/product";
import { unstable_cache } from "next/cache";
import { getSiteSettings } from "./settings";

export const getProductList = unstable_cache(
  async (filters: { featured?: number } = {}): Promise<Product[]> => {
    try {
      const response = await api("product_list.get_product_list", {
        method: "POST",
        body: JSON.stringify(filters),
        next: { revalidate: 0, tags: ["product-data"] },
      });

      if (!response.ok) throw new Error("Failed to fetch product list");

      const data = await response.json();
      return data.message || [];
    } catch (error) {
      console.error("Error fetching product list:", error);
      return [];
    }
  },
  ["product-list"],
  { tags: ["product-data"] },
);

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<SingleProduct | object> => {
    if (!slug) return {};
    try {
      const response = await api(`single_product.get_product_by_slug?slug=${slug}`, {
        next: { tags: [`product-data`, `product-${slug}`] },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data?.message || {};
    } catch (error) {
      console.error(`Error fetching product by slug ${slug}:`, error);
      return {};
    }
  },
  ["product-by-slug"],
  { tags: [`product-data`] }
);

export async function getProductPageData(
  filter: { featured?: number } = {},
) {
  const [productData, settings] = await Promise.all([
    getProductList(filter),
    getSiteSettings(),
  ]);
  return { productData, settings };
}
