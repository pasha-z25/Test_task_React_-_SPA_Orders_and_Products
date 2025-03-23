import { AppDataSource } from '@/db';
import { Product } from '@/db/entities';
import { Repository } from 'typeorm';

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

export const getProducts = async () => {
  try {
    return await productRepository.find({ relations: ['order'] });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProduct = async (productId: number) => {
  try {
    return await productRepository.findOne({
      where: { id: productId },
      relations: ['order'],
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addProduct = async (product: Partial<Product>) => {
  try {
    const newProduct = productRepository.create(product);
    return await productRepository.save(newProduct);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProduct = async (
  productId: number,
  updatedData: Partial<Product>
) => {
  try {
    await productRepository.update(productId, updatedData);
    return await getProduct(productId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const product = await productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found');

    await productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  } catch (error) {
    return Promise.reject(error);
  }
};
