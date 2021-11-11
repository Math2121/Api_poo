import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
@Entity('provider')
export class Provider{
    @PrimaryColumn()
    id:string

    @Column()
    provider_name:string

    @Column()
    email:string

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}