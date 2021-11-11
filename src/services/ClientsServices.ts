// IMPORTAÇÃO DE COMPONENTES //
// getCustomrepository permite o uso das funções do CRUD contidas no typeorm.
// Clientsrepository acessa o local onde está as informações do objeto cliente. 
import { getCustomRepository } from 'typeorm'
import { ClientsRepository } from '../repositories/ClientsRepository'

// CRIAÇÃO DE INTERFACES //
// Interfaces: Conjunto de dados que descrevem a estrutura de um objeto.
// Interfaces podem conter atributos e métodos.
// Interfaces são modelos para criação de objetos.
// O objeto que utiliza uma interface precisa conter todos atributos e métodos da interface.
interface IClientsCreate {
    name: string;
    telephone: string;
    email: string;
}

interface IClientsID {
    id: string;
}

interface IClientsUpdate {
    id: string;
    name: string;
    telephone: string;
    email: string;
}

class ClientsServices {

    async create({ name, telephone, email }: IClientsCreate){

        const clientsRepository = getCustomRepository(ClientsRepository)
        const emailAlreadyExist = await clientsRepository.findOne({ email }) 

        if(emailAlreadyExist) {
            throw new Error('Esse endereço de email já existe!')
        }

        const clients = await clientsRepository.create({
            name,
            telephone,
            email
        })

        await clientsRepository.save(clients)
        return clients
    }

    async index() {

        const clientsRepository = getCustomRepository(ClientsRepository)
        const clients = await clientsRepository.find()
        return clients
    }

    async show({ id }: IClientsID) {

        const clientsRepository = getCustomRepository(ClientsRepository)
        const clients = await clientsRepository.findOne({ id })

        if(!clients) {
            throw new Error('O cliente não existe para ser pesquisado!')
        }

        return clients
    }

    async delete({ id }: IClientsID) {

        const clientsRepository = getCustomRepository(ClientsRepository)
        let clients = await clientsRepository.findOne({ id })

        if(!clients) {
            throw new Error('O cliente não existe para ser excluido!')
        }

        return await clientsRepository.delete({ id })

    }

    async update({  id, name, telephone, email }: IClientsUpdate) {

        const clientsRepository = getCustomRepository(ClientsRepository)
        let clients = await clientsRepository.findOne({ id })
        const emailAlreadyExist = await clientsRepository.findOne({ email }) 
        
        if(!clients) {
            throw new Error('O cliente a ser alterado não foi encontrado!')
        }

        if(emailAlreadyExist) {
            throw new Error('Esse endereço de email já existe!')
        }

        await clientsRepository.update(id, {name, telephone, email })
        clients = await clientsRepository.findOne({ id })

        return clients

    }

}

export { ClientsServices }