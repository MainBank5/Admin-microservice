import { IsNotEmpty, IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
