import { getProductBySlug } from "@/get-api-data/product";
import ProductContent from "./ProductContent";
import { SingleProduct } from "@/types/product";
import { getSiteSettings } from "@/get-api-data/settings";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const settings = await getSiteSettings();

  
  if (!product || !("id" in product)) {
    return (
      <div className="p-6 text-center text-gray-500">Product not found</div>
    );
  }

  return <ProductContent product={product as SingleProduct} settings={settings} />;
}