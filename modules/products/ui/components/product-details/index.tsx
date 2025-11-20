'use client'

import { useGetProductById } from "@/modules/products/http/hooks/use-products";
import { ProductImage } from "./ui/product-image";
import { ProductHeader } from "./ui/product-header";
import { ProductPricing } from "./ui/product-pricing";
import { ProductActions } from "./ui/product-actions";
import { ProductDescription } from "./ui/product-description";
import { ProductFeatures } from "./ui/product-features";
import { StockIndicator } from "./ui/stock-indicator";
import { CategorySpecificContent } from "./ui/category-specific-content";
import { AdditionalInfo } from "./ui/additional-info";
import { CustomerReviews } from "./ui/customer-reviews";
import { FaqSection } from "./ui/faq-section";

interface ProductDetailsProps {
  productId: number;
}

function getProductMockData(productId: number) {
  const seed = productId * 7;

  return {
    rating: 3.5 + (seed % 15) / 10,
    reviewCount: 50 + (seed % 450),
    discount: seed % 3 === 0 ? 10 + (seed % 30) : 0,
    stock: seed % 5 === 0 ? seed % 5 : 10 + (seed % 90),
    freeShipping: seed % 2 === 0,
    warranty: seed % 3 === 0 ? 12 : seed % 2 === 0 ? 6 : 0,
  }
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data } = useGetProductById(productId)
  const mockData = getProductMockData(productId)

  const originalPrice = data.price
  const discountedPrice = mockData.discount > 0
    ? originalPrice * (1 - mockData.discount / 100)
    : originalPrice

  return (
    <div className="flex flex-col space-y-9">
      <div className="flex flex-col lg:flex-row gap-9">
        <ProductImage
          image={data.image}
          title={data.title}
          discount={mockData.discount}
        />
        <div className="flex-1 flex flex-col space-y-5">
          <ProductHeader
            category={data.category}
            title={data.title}
            rating={mockData.rating}
            reviewCount={mockData.reviewCount}
          />
          <ProductPricing
            discountedPrice={discountedPrice}
            originalPrice={originalPrice}
            hasDiscount={mockData.discount > 0}
          />
          <StockIndicator 
            stock={mockData.stock} 
          />
          <CategorySpecificContent 
            category={data.category} 
          />
          <ProductActions 
            stock={mockData.stock} 
          />
          <ProductFeatures
            freeShipping={mockData.freeShipping}
            warranty={mockData.warranty}
          />
          <ProductDescription 
            description={data.description} 
          />
        </div>
      </div>
      <AdditionalInfo />
      <CustomerReviews
        rating={mockData.rating}
        reviewCount={mockData.reviewCount}
      />
      <FaqSection />
    </div>
  );
}
