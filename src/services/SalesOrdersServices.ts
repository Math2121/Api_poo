import { getCustomRepository } from "typeorm";
import { SalesOrderRepository } from "../repositories/SalesOrdersRepository";

interface ISalesOrdersServiceCreate {
  client_id: string;
  product_id: string;
  amount: number;
  saleDate: Date;
}
interface ISalesOrderUpdate {
  id: string;
  client_id: string;
  product_id: string;
  amount: number;
  saleDate: Date;
}
class SalesOrdersServices {
  private salesOrdersRepository: SalesOrderRepository;
  constructor() {
    this.salesOrdersRepository = getCustomRepository(SalesOrderRepository);
  }
  async create({
    client_id,
    product_id,
    amount,
    saleDate,
  }: ISalesOrdersServiceCreate) {
    const salesOrders = this.salesOrdersRepository.create({
      client_id,
      product_id,
      amount,
      saleDate,
    });

    await this.salesOrdersRepository.save(salesOrders);
    return salesOrders;
  }

  async index() {
    const salesOrders = await this.salesOrdersRepository.find();
    return salesOrders;
  }
  async show(id: string) {
    const salesOrders = await this.salesOrdersRepository.findOne(
      { id },
      { relations: ["client", "product"] }
    );

    if (!salesOrders) {
      throw new Error("O produto não existe para ser pesquisado!");
    }

    return salesOrders;
  }

  async updated({
    id,
    client_id,
    product_id,
    amount,
    saleDate,
  }: ISalesOrderUpdate) {
    let sales = await this.salesOrdersRepository.findOne(id);

    if (!sales) {
      throw new Error("Sale Order not Exist");
    }
    await this.salesOrdersRepository.update(id, {
      client_id,
      product_id,
      amount,
      saleDate,
    });

    sales = await this.salesOrdersRepository.findOne({ id });
    return sales;
  }

  async delete(id: string) {
    let products = await this.salesOrdersRepository.findOne({ id });

    if (!products) {
      throw new Error("O produto não existe para ser excluido!");
    }

    return await this.salesOrdersRepository.delete({ id });
  }
}

export { SalesOrdersServices };
