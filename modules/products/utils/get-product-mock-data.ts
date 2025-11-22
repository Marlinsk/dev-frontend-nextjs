export function getProductMockData(productId: number) {
  const seed = productId * 7;

  const totalSales = 100 + (seed % 900)
  const monthlySales = Math.floor(totalSales / 12) + (seed % 50)
  const weeklySales = Math.floor(monthlySales / 4) + (seed % 15)
  const stock = seed % 5 === 0 ? seed % 5 : 10 + (seed % 90)
  const returnRate = 1 + (seed % 8) / 10
  const avgOrderValue = 25 + (seed % 75)
  const reservedStock = Math.floor(stock * (0.1 + (seed % 20) / 100))
  const minStock = 5 + (seed % 10)
  const costPrice = 10 + (seed % 40)
  const revenue = totalSales * (19.99 + (seed % 80))
  const monthlyRevenue = monthlySales * (19.99 + (seed % 80))

  return {
    rating: 3.5 + (seed % 15) / 10,
    reviewCount: 50 + (seed % 450),
    totalSales,
    monthlySales,
    weeklySales,
    stock,
    reservedStock,
    minStock,
    lastRestock: new Date(Date.now() - (seed % 30) * 24 * 60 * 60 * 1000).toISOString(),
    avgDailySales: Math.floor(monthlySales / 30) + 1,
    revenue,
    monthlyRevenue,
    costPrice,
    profitMargin: ((19.99 + (seed % 80) - costPrice) / (19.99 + (seed % 80))) * 100,
    avgOrderValue,
    conversionRate: 2.5 + (seed % 50) / 10,
    returnRate,
    viewsCount: totalSales * (8 + (seed % 12)),
    cartAdditions: Math.floor(totalSales * (1.5 + (seed % 10) / 10)),
  }
}
