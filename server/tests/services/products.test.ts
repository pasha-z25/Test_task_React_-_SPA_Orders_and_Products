import { Product, User } from '@/db/entities';
import { getRepository } from '@/db/repository';
import * as productService from '@/services/products';
import { logger } from '@/utils/logger';

jest.mock('@/db/repository');
jest.mock('@/utils/logger');

describe('product service', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockProductRepository: any;

  const productId = 1;
  const product: Product = {
    id: productId,
    title: 'Product 1',
    order: {
      id: 0,
      title: '',
      date: '',
      description: '',
      user: new User(),
      products: [],
    },
    serialNumber: 0,
    isNew: false,
    photo: '',
    type: '',
    specification: '',
    guarantee: {
      start: '',
      end: '',
    },
    price: [],
    date: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockProductRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    (getRepository as jest.Mock).mockReturnValue(mockProductRepository);
    (logger.log as jest.Mock).mockImplementation(() => {});
  });

  describe('getProducts', () => {
    it('should return all products with relations', async () => {
      const products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      (mockProductRepository.find as jest.Mock).mockResolvedValue(products);

      const result = await productService.getProducts();

      expect(result).toBe(products);
      expect(mockProductRepository.find).toHaveBeenCalledWith({
        relations: ['order'],
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockProductRepository.find as jest.Mock).mockRejectedValue(error);

      await expect(productService.getProducts()).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:products',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('getProduct', () => {
    it('should return a product with relations', async () => {
      (mockProductRepository.findOne as jest.Mock).mockResolvedValue(product);

      const result = await productService.getProduct(productId);

      expect(result).toBe(product);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['order'],
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockProductRepository.findOne as jest.Mock).mockRejectedValue(error);

      await expect(productService.getProduct(productId)).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:products',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('addProduct', () => {
    it('should create and save a product', async () => {
      (mockProductRepository.create as jest.Mock).mockReturnValue(product);
      (mockProductRepository.save as jest.Mock).mockResolvedValue(product);

      const result = await productService.addProduct(product);

      expect(result).toBe(product);
      expect(mockProductRepository.create).toHaveBeenCalledWith(product);
      expect(mockProductRepository.save).toHaveBeenCalledWith(product);
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockProductRepository.create as jest.Mock).mockReturnValue(product);
      (mockProductRepository.save as jest.Mock).mockRejectedValue(error);

      await expect(productService.addProduct(product)).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:products',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return updated product', async () => {
      const updatedProduct = { id: productId, name: 'Updated Product' };
      (mockProductRepository.update as jest.Mock).mockResolvedValue(undefined);
      (mockProductRepository.findOne as jest.Mock).mockResolvedValue(
        updatedProduct
      );

      const result = await productService.updateProduct(productId, product);

      expect(result).toBe(updatedProduct);
      expect(mockProductRepository.update).toHaveBeenCalledWith(
        productId,
        product
      );
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['order'],
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockProductRepository.update as jest.Mock).mockRejectedValue(error);

      await expect(
        productService.updateProduct(productId, product)
      ).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:products',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return success message', async () => {
      (mockProductRepository.findOne as jest.Mock).mockResolvedValue(product);
      (mockProductRepository.remove as jest.Mock).mockResolvedValue(undefined);

      const result = await productService.deleteProduct(productId);

      expect(result).toEqual({ message: 'Product deleted successfully' });
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(mockProductRepository.remove).toHaveBeenCalledWith(product);
    });

    it('should reject with "Product not found" if product does not exist', async () => {
      (mockProductRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        productService.deleteProduct(productId)
      ).rejects.toMatchObject({
        message: 'Product not found',
      });
    });

    it('should reject and log error on failure', async () => {
      const error = new Error('DB error');
      (mockProductRepository.findOne as jest.Mock).mockRejectedValue(error);

      await expect(productService.deleteProduct(productId)).rejects.toBe(error);
      expect(logger.log).toHaveBeenCalledWith({
        level: 'error',
        scope: 'services:products',
        message: '❌ Something went wrong!',
        error,
      });
    });
  });
});
