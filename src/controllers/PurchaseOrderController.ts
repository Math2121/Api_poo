import { Request, Response } from "express";
import { PurchaseOrderServices } from "../services/PurchaseOrderSevices";


export class PurchaseOrderController{
 
    async create(request: Request,response: Response):Promise<Response> {
        const {product_id,provider_id,amount,unit_value,purchase_date} = request.body
       
        const purchaseOrderService = new PurchaseOrderServices()
        try {
            await purchaseOrderService.create({product_id,provider_id,amount,unit_value,purchase_date})
            return response.status(204).send()
        } catch (error) {
            return response.status(400).json({message: error.message})
        }
    }

    async list(request: Request,response: Response):Promise<Response> {

       
        const purchaseOrderService = new PurchaseOrderServices()
        try {
            const purchases = await purchaseOrderService.list()
            return response.status(200).json(purchases)
        } catch (error) {
            return response.status(400).json({message: error.message})
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const purchaseOrderService = new PurchaseOrderServices();
        try {
          await purchaseOrderService.delete(id);
          return response.status(204).send();
        } catch (error) {
          return response.status(400).json({ message: error.message });
        }
      }
}