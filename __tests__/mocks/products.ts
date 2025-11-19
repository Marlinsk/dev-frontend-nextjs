import { Product } from '@/modules/products/types/product'

export const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product description',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
}

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Smartphone XYZ',
    price: 599.99,
    description: 'Latest model smartphone with amazing features',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/phone.jpg',
  },
  {
    id: 2,
    title: 'Gold Necklace',
    price: 299.99,
    description: 'Beautiful gold necklace',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/necklace.jpg',
  },
  {
    id: 3,
    title: 'Men\'s Casual Shirt',
    price: 49.99,
    description: 'Comfortable cotton casual shirt',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/shirt.jpg',
  },
  {
    id: 4,
    title: 'Women\'s Summer Dress',
    price: 79.99,
    description: 'Elegant summer dress for women',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/dress.jpg',
  },
  {
    id: 5,
    title: 'Laptop Pro 15',
    price: 1299.99,
    description: 'High-performance laptop for professionals',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/laptop.jpg',
  },
]
