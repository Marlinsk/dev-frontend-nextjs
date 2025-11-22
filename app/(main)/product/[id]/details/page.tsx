import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/function/get-query-client";
import { fetchGetProductById } from "@/modules/products/http/products";
import { ProductDetails, ProductDetailsHeader } from "@/modules/products/ui/components";
import { ProductDetailsSkeleton } from "@/modules/products/ui/loading";

interface ProductDetailsPageParams {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageParams) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', id],
    queryFn: () => fetchGetProductById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsHeader />
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={Number(id)} />
      </Suspense>
    </HydrationBoundary>
  )
}
