import { products } from '../data';

export const getProducts = () => {
  return products;
};

export const getProductById = (productId: number) => {
  const product = products.find((product) => product.id === productId);

  return product;
};
