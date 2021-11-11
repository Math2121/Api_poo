import { Request, Response } from 'express'
import { ProductsServices } from '../services/ProductsServices'

class ProductsController {

    async create(request: Request, response: Response) {

        const { name, unity } = request.body
        const productsServices = new ProductsServices()

        try { 
            const products = await productsServices.create({name, unity})
            return response.json(products)
        } catch(err){
            return response
                .status(400)
                .json({message: err.message})
        }
    }

    async index(request: Request, response: Response) {

        const productsServices = new ProductsServices()

        try { 
            const products = await productsServices.index()
            return response.status(200).json(products)
        } catch (err) {
            return response
                .status(400)
                .json({message: err.message})
        }
    }

    async show(request: Request, response: Response) {

        const productsServices = new ProductsServices()
        const { id } = request.params

        try {
            const products = await productsServices.show({ id })
            return response.status(200).json(products)
        } catch (err) {
            return response
                .status(400)
                .json({message: err.message})
        }
    }

    async delete(request: Request, response: Response) {

        const productsServices = new ProductsServices()
        const { id } = request.params

        try {
            const products = await productsServices.delete({ id })
            return response.json({message: 'Produto excluido com sucesso!!!'})
        }catch (err) {
            return response
                .status(400)
                .json({message: err.message})
        }
    }

    async update(request: Request, response: Response) {

        const { name, unity} = request.body
        const { id } = request.params
        const productsServices = new ProductsServices()

        try { 
            const products = await productsServices.update({ id, name, unity })
            return response.status(200).json(products)
        } catch (err) {
            return response
                .status(400)
                .json({message: err.message})
        }
    }
}

export { ProductsController }