import { EntityRepository, Repository } from 'typeorm'
import { SaleOrder } from '../entities/SaleOrder'

@EntityRepository(SaleOrder)
class SalesOrderRepository extends Repository<SaleOrder> {

}

export { SalesOrderRepository }