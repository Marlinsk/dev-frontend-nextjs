'use client'

import { useGetProductById } from "@/modules/products/http/hooks";
import { ProductImage } from "./ui/product-image";
import { ProductHeader } from "./ui/product-header";
import { ProductPricing } from "./ui/product-pricing";
import { ProductDescription } from "./ui/product-description";
import { StockIndicator } from "./ui/stock-indicator";
import { CustomerReviews } from "./ui/customer-reviews";
import { SalesSummary } from "./ui/sales-summary";
import { getProductMockData } from "../../../utils/get-product-mock-data";

interface ProductDetailsProps {
  productId: number;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data } = useGetProductById(productId)
  const mockData = getProductMockData(productId)

  return (
    <div className="flex flex-col space-y-9">
      <div className="flex flex-col lg:flex-row gap-9">
        <div className="flex flex-col w-full lg:w-[500px] shrink-0 space-y-7">
          <ProductImage
            image={data.image}
            title={data.title}
          />
          <div className="hidden lg:block">
            <ProductDescription
              description={data.description}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col space-y-5">
          <ProductHeader
            category={data.category}
            title={data.title}
            rating={mockData.rating}
            reviewCount={mockData.reviewCount}
          />
          <div className="block lg:hidden">
            <ProductDescription
              description={data.description}
            />
          </div>
          <SalesSummary
            totalSales={mockData.totalSales}
            monthlySales={mockData.monthlySales}
            weeklySales={mockData.weeklySales}
            conversionRate={mockData.conversionRate}
            returnRate={mockData.returnRate}
            viewsCount={mockData.viewsCount}
            cartAdditions={mockData.cartAdditions}
          />
          <ProductPricing
            price={data.price}
            revenue={mockData.revenue}
            monthlyRevenue={mockData.monthlyRevenue}
            costPrice={mockData.costPrice}
            profitMargin={mockData.profitMargin}
            avgOrderValue={mockData.avgOrderValue}
          />
          <StockIndicator
            stock={mockData.stock}
            reservedStock={mockData.reservedStock}
            minStock={mockData.minStock}
            lastRestock={mockData.lastRestock}
            avgDailySales={mockData.avgDailySales}
          />
        </div>
      </div>
      <CustomerReviews
        rating={mockData.rating}
        reviewCount={mockData.reviewCount}
      />
    </div>
  );
}
