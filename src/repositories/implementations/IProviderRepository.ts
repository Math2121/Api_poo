import { Provider } from "../../entities/Provider";

interface ProviderDTO{
    name:string,
    email:string,
}
interface IProviderRepository{
    create({name,email}:ProviderDTO):Promise<void>
    listAll():Promise<Provider[]>
    findByEmail(email:string):Promise<Provider>
    delete(id:string):Promise<void>
    findById(id:string):Promise<Provider>
}

export {IProviderRepository}