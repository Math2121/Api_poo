import { EntityRepository, Repository } from 'typeorm'
import { PurchaseOrder } from '../entities/PurchaseOrder'

@EntityRepository(PurchaseOrder)
class PurchaseOrderRepository extends Repository<PurchaseOrder> {

}

export { PurchaseOrderRepository }