// import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
// import { ProductsService } from './products.service';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly service: ProductsService) {}

//   @Post()
//   create(@Body() body) {
//     return this.service.create(body);
//   }

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.service.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() body) {
//     return this.service.update(id, body);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: number) {
//     return this.service.delete(id);
//   }
// }
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { log } from 'console';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() body: Partial<Product>) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Product>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
