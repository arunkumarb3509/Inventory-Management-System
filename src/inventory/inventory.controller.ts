import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post('inward')
  inward(@Body() body: { productId: number; quantity: number }) {
    return this.service.inward(body.productId, body.quantity);
  }

  @Post('outward')
  outward(@Body() body: { productId: number; quantity: number }) {
    return this.service.outward(body.productId, body.quantity);
  }
}
