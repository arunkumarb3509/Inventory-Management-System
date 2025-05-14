import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryTransaction } from './transaction.entity';
import { ProductsService } from '../product/products.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryTransaction) private repo: Repository<InventoryTransaction>,
    private productService: ProductsService
  ) {}

  async inward(productId: number, quantity: number) {
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    product.currentStock += quantity;
    await this.productService.update(productId, { currentStock: product.currentStock });

    const tx = this.repo.create({ productId, quantity, type: 'INWARD' });
    return this.repo.save(tx);
  }

  async outward(productId: number, quantity: number) {
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    if (product.currentStock < quantity) throw new BadRequestException('Insufficient stock');

    product.currentStock -= quantity;
    await this.productService.update(productId, { currentStock: product.currentStock });

    const tx = this.repo.create({ productId, quantity, type: 'OUTWARD' });
    return this.repo.save(tx);
  }
}
