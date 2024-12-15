import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product-entity';

@Injectable()
export class ProductService {
  constructor(private readonly _prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this._prisma.product.findMany();
  }
  async getProductById(id: string): Promise<Product> {
    return this._prisma.product.findUnique({ where: { id } });
  }
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, description, image } = createProductDto;
    try {
      const newProduct = await this._prisma.product.create({
        data: {
          name,
          price,
          description,
          image,
        },
      });
      return newProduct;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Product with name "${name}" already exists.`,
        );
      }
      throw new BadRequestException(
        'An error occurred while creating the product.',
      );
    }
  }
  async updateProduct(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { name, price, description, image } = createProductDto;
    try {
      const updatedProduct = await this._prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          description,
          image,
        },
      });
      return updatedProduct;
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
  async deleteProduct(
    id: string,
  ): Promise<{ message: string; deletedProduct: Product }> {
    try {
      const deletedProduct = await this._prisma.product.delete({
        where: { id },
      });
      return {
        message: 'Product deleted successfully',
        deletedProduct,
      };
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while deleting the product.',
      );
    }
  }
}
