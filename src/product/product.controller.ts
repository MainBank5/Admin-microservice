import { Controller, Delete, HttpCode, Inject, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product-entity';


@Controller('products')
export class ProductController {
  constructor( private readonly _productService: ProductService ) {}
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @HttpCode(200)
  async getAllProducts(): Promise<Product[]> {
    return await this._productService.getAllProducts();
  }
  @Post()
  @ApiOperation({ summary: 'Creates a new product' })
  @HttpCode(201)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this._productService.createProduct(createProductDto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @HttpCode(200)
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this._productService.getProductById(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update product by id' })
  @HttpCode(200)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this._productService.updateProduct(id, updateProductDto);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by id' })
  @HttpCode(200)
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<{ message: string; deletedProduct: Product }> {
    return await this._productService.deleteProduct(id);
  }
}
