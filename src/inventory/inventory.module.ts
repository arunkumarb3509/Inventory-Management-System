import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryTransaction } from './transaction.entity';
import { ProductsModule } from '../product/products.modules';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryTransaction]), ProductsModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
