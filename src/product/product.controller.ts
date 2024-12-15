import { Controller, Delete, HttpCode, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product-entity';

@Controller('products')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}
  @Get()
  @HttpCode(200)
  async getAllProducts(): Promise<Product[]> {
    return await this._productService.getAllProducts();
  }
  @Post()
  @HttpCode(201)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this._productService.createProduct(createProductDto);
  }
  @Get(':id')
  @HttpCode(200)
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this._productService.getProductById(id);
  }
  @Put(':id')
  @HttpCode(200)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this._productService.updateProduct(id, updateProductDto);
  }
  @Delete(':id')
  @HttpCode(200)
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<{ message: string; deletedProduct: Product }> {
    return await this._productService.deleteProduct(id);
  }
}
