
import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../repositories/ProductsRepository'

interface IProductsCreate {
    name: string;
    unity: string;
}

interface IProductsID {
    id: string;
}

interface IProductsUpdate {
    id: string;
    name: string;
    unity: string;
}

class ProductsServices {

    async create({ name, unity }: IProductsCreate){

        const productsRepository = getCustomRepository(ProductsRepository)
        const nameAlreadyExist = await productsRepository.findOne({ name }) 

        if(nameAlreadyExist) {
            throw new Error('Esse produto já foi cadastrado!')
        }

        const products = await productsRepository.create({
            name,
            unity
        })

        await productsRepository.save(products)
        return products
    }

    async index() {

        const productsRepository = getCustomRepository(ProductsRepository)
        const products = await productsRepository.find()
        return products
    }

    async show({ id }: IProductsID) {

        const productsRepository = getCustomRepository(ProductsRepository)
        const products = await productsRepository.findOne({ id })

        if(!products) {
            throw new Error('O produto não existe para ser pesquisado!')
        }

        return products
    }

    async delete({ id }: IProductsID) {

        const productsRepository = getCustomRepository(ProductsRepository)
        let products = await productsRepository.findOne({ id })

        if(!products) {
            throw new Error('O produto não existe para ser excluido!')
        }

        return await productsRepository.delete({ id })

    }

    async update({  id, name, unity }: IProductsUpdate) {

        const productsRepository = getCustomRepository(ProductsRepository)
        let products = await productsRepository.findOne({ id })

        if(!products) {
            throw new Error('O produto a ser alterado não foi encontrado!')
        }

        await productsRepository.update(id, {name, unity })
        products = await productsRepository.findOne({ id })

        return products

    }

}

export { ProductsServices }