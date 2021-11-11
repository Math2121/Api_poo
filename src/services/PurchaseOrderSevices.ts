import { getCustomRepository } from "typeorm";
import { PurchaseOrder } from "../entities/PurchaseOrder";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { PurchaseOrderRepository } from "../repositories/PurchaseOrderRepository";

interface IPurchaseCreate {
  product_id: string;
  provider_id: string;
  amount: number;
  unit_value: number;
  purchase_date: Date;
}
class PurchaseOrderServices {
  private purchaseOrderRepository: PurchaseOrderRepository;
  private productRepository: ProductsRepository;
  constructor() {
    this.purchaseOrderRepository = getCustomRepository(PurchaseOrderRepository);
    this.productRepository = getCustomRepository(ProductsRepository);
  }

  async create({
    product_id,
    provider_id,
    amount,
    unit_value,
    purchase_date,
  }: IPurchaseCreate): Promise<void> {
    const productExist = await this.productRepository.findOne(product_id);

    if (!productExist) {
      throw new Error("Product not exist");
    }
    try {
      const purchaseOrder =  this.purchaseOrderRepository.create({
        product_id,
        provider_id,
        amount,
        unit_value,
        purchase_date,
      });
      await this.purchaseOrderRepository.save(purchaseOrder)
    } catch (error) {
      throw new Error(error.message);
    }
  }

    async list(): Promise<PurchaseOrder[]> {
      const providers = await this.purchaseOrderRepository.find();

      return providers;
    }

    async delete(id: string): Promise<void> {
      const pruchaseOrder = await this.purchaseOrderRepository.findOne(id);
      if (!pruchaseOrder) {
        throw new Error("Purchase Order not exist!");
      }
      await this.purchaseOrderRepository.delete(id);
    }
}
export { PurchaseOrderServices };
