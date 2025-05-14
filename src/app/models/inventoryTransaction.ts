export class InventoryTransaction {
  productId: number =0;
  quantity: number =0;
  type?: 'inward' | 'outward';
  timestamp?: string;
}