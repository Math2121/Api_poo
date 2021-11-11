import { Request, Response } from 'express'
import { BalanceStockServices } from '../services/BalanceStockServices'

class BalanceStockController {

  async create(request: Request, response: Response) {
    const { product_id, amount } = request.body
    const balanceServices = new BalanceStockServices()

    try {
      const balanceInventory = await balanceServices.create({ product_id, amount })
      return response.json(balanceInventory)
    } catch (err) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }
  async index(request: Request, response: Response) {
    const balanceServices = new BalanceStockServices();
    try {
      const balanceInventory = await balanceServices.index()
      return response.status(200).json(balanceInventory)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }


 
  
  async delete(request: Request, response: Response) {
    //
    const {id} = request.params;
    const balanceService = new BalanceStockServices();
    try {
      const balanceInventory = await balanceService.delete(id);
      return response.status(200).send()
    } catch(err) {
      return response
      .status(400)
      .json({ mensagem: err.message })
    }
  }
}

export { BalanceStockController }