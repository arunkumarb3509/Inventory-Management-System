import { Inject, Controller, Get } from '@nestjs/common';
import { CacheKey, CacheTTL, CACHE_MANAGER } from '@nestjs/cache-manager';

import { ProductsService } from '../product/products.service';
import { Cache } from 'cache-manager';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private productService: ProductsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @CacheTTL(30) // 30 seconds cache
  async getDashboard() {
    const cached = await this.cacheManager.get('dashboard');
    if (cached) return cached;

    const products = await this.productService.findAll();
    const lowStockProducts = products.filter(p => p.currentStock < p.minQty);
    const result = {
      totalProducts: products.length,
      lowStockProducts,
    };
    await this.cacheManager.set('dashboard', result, 30);
    return result;
  }
}
