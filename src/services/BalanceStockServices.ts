import { getCustomRepository, Repository } from "typeorm";
import { BalanceStock } from "../entities/BalanceStock";
import { BalanceStockRepository } from "../repositories/BalanceStockRepository";

interface ICreateBalanceStock {
  product_id: string;
  amount : number;
}

class BalanceStockServices {
  
  async create({product_id,amount}:ICreateBalanceStock) {
    const repository = getCustomRepository(BalanceStockRepository);
    const checkIfExists = await repository.findOne({
      where: {
        product_id
      }
    });
    if(checkIfExists) {
        await repository.update(checkIfExists.id, {
        amount: checkIfExists.amount + amount
        })
        const balanceStockUpdated = await repository.findOne({
          select: ['id','product_id','amount'],
          where: {
            product_id
          }
        })
        return balanceStockUpdated;
    }
    const balanceInventory = repository.create({
       product_id,
       amount
    })
    await repository.save(balanceInventory);
    return balanceInventory;
  }
  async index() {
    const repository = getCustomRepository(BalanceStockRepository);
    const balanceInventories = await repository.find({
      relations: ['product']
    });
    return balanceInventories; 

  }

  async delete(id : string) {
    const repository = getCustomRepository(BalanceStockRepository);
    const fileDestroyed = await repository.delete(id);
    if(fileDestroyed.affected == 0 ) {
      throw new Error("Saldo em estoque nao encontrado!")
    }
    return fileDestroyed;
  }

}
export {BalanceStockServices}