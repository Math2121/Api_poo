import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Product } from "./Product";
import { v4 as uuid } from "uuid";
import { Provider } from "./Provider";
@Entity("purchase_order")
export class PurchaseOrder {
  @PrimaryColumn()
  id: string;
 
  @JoinColumn({ name: 'product_id'})
  @ManyToOne(() => Product)
  product: Product;
  @Column()
  product_id: string;

  @JoinColumn({ name: 'provider_id'})
  @ManyToOne(() => Product)
  provider: Provider;

  @Column()
  provider_id: string;
  
  @Column()
  amount: number;

  @Column()
  unit_value: number;

  @Column()
  purchase_date: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
