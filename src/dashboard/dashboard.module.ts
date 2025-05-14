import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { ProductsModule } from '../product/products.modules';

@Module({
  imports: [ProductsModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
