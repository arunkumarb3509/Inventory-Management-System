import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryTransaction } from './inventory/transaction.entity';
import { Product } from './product/product.entity';
import { ProductsModule } from './product/products.modules';
import { InventoryModule } from './inventory/inventory.module';
import { DashboardModule } from './dashboard/dashboard.module';
// import { redisStore } from 'cache-manager-ioredis'; 


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Arun@2002',
      database: 'inventorydb',
      entities: [Product,InventoryTransaction],
      synchronize: true, // Disable in production
    }),
  //  CacheModule.registerAsync({
  //     useFactory: async () => ({
  //       store: await redisStore(), 
  //       host: 'localhost',
  //       port: 6379,
  //       ttl: 60,
  //     }),
  //   }),

    ProductsModule,
    InventoryModule,
    //  DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


