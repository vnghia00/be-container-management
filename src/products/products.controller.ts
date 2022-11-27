import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthUser } from 'src/decors/user.decorator';
import { JwtUser } from 'src/auth/inteface/jwtUser';
import { BearerJwt } from 'src/decors/bearer-jwt.decorator';

@ApiTags('Products')
@BearerJwt()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() dto: CreateProductDto, @AuthUser() authUser: JwtUser) {
    return this.productsService.create(dto, authUser);
  }

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'show', required: false, type: Boolean })
  findAll(
    @AuthUser() authUser: JwtUser,
    @Query('limit', new DefaultValuePipe('0'), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe('0'), ParseIntPipe) offset?: number,
    @Query('search') search?: string,
    @Query('category') ctg?: string,
    @Query('show') show?: boolean,
  ) {
    return this.productsService.findAll(authUser, {
      limit,
      offset,
      show,
      search,
      category: ctg,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() authUser: JwtUser) {
    return this.productsService.findOne(id, authUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto, @AuthUser() authUser: JwtUser) {
    return this.productsService.update(id, dto, authUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() authUser: JwtUser) {
    return this.productsService.remove(id, authUser);
  }
}
