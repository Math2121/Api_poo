import { Request, Response } from "express";
import { SalesOrdersServices } from "../services/SalesOrdersServices";

class SalesOrdersController {
  async create(request: Request, response: Response) {
    let { client_id, product_id, amount, saleDate } = request.body;
    const salesOrdersServices = new SalesOrdersServices();
    saleDate = new Date(saleDate);
    try {
      const salesOrders = await salesOrdersServices.create({
        client_id,
        product_id,
        amount,
        saleDate,
      });
      return response.status(200).json(salesOrders);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async index(request: Request, response: Response) {
    const salesOrdersService = new SalesOrdersServices();

    try {
      const salesOrders =  salesOrdersService.index();
      return response.status(200).json(salesOrders);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async showOrders(request: Request, response: Response) {
    const salesOrdersServices = new SalesOrdersServices()
        const { id } = request.params

        try {
            const products = await salesOrdersServices.show(id)
            return response.status(200).json(products)
        } catch (err) {
            return response
                .status(400)
                .json({message: err.message})
        }
  }
  async update(request: Request, response: Response) {

    let { client_id, product_id, amount, saleDate } = request.body;
    saleDate = new Date(saleDate);
    const { id } = request.params
    const salesOrderaServices = new SalesOrdersServices()

    try { 
        const salesOrder = await salesOrderaServices.updated({id,client_id, product_id, amount, saleDate})
        return response.status(200).json(salesOrder)
    } catch (err) {
        return response
            .status(400)
            .json({message: err.message})
    }
}
async delete(request: Request, response: Response) {

  const salesOrderaServices = new SalesOrdersServices()
  const { id } = request.params

  try {
      const sales = await salesOrderaServices.delete(id )
      return response.json({message: 'Sales ORder excluido com sucesso!!!'})
  }catch (err) {
      return response
          .status(400)
          .json({message: err.message})
  }
}
}

export { SalesOrdersController };
