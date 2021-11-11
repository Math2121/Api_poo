import { EntityRepository, Repository } from 'typeorm'
import { BalanceStock } from '../entities/BalanceStock'

@EntityRepository(BalanceStock)
class BalanceStockRepository extends Repository<BalanceStock> {

}

export { BalanceStockRepository }