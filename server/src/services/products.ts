import { Repository } from 'typeorm';
import { AppDataSource } from '../db';
import { Product } from '../db/entities';

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

export const getProducts = async () => {
  return await productRepository.find();
};

export const getProduct = async (productId: number) => {
  return await productRepository.findOne({ where: { id: productId } });
};

export const addProduct = async (product: Partial<Product>) => {
  const newProduct = productRepository.create(product);
  return await productRepository.save(newProduct);
};

export const updateProduct = async (
  productId: number,
  updatedData: Partial<Product>
) => {
  await productRepository.update(productId, updatedData);
  return await getProduct(productId);
};

export const deleteProduct = async (productId: number) => {
  const product = await productRepository.findOne({ where: { id: productId } });
  if (!product) throw new Error('Product not found');

  await productRepository.remove(product);
  return { message: 'Product deleted successfully' };
};
