import { EntityRepository, getRepository, Repository } from "typeorm";
import { Provider } from "../entities/Provider";
import { IProviderRepository } from "./implementations/IProviderRepository";
interface IProviderDTO {
  name: string;
  email: string;
}

@EntityRepository(Provider)
class ProviderRepository implements IProviderRepository {
  private repository: Repository<Provider>;
  constructor() {
    this.repository = getRepository(Provider);
  }
  async create({ name, email }: IProviderDTO): Promise<void> {
    const provider = this.repository.create({
      provider_name:name,
      email,
    });

    await this.repository.save(provider);
  }
  async listAll(): Promise<Provider[]> {
    const provider = await this.repository.find();
    return provider;
  }

  async findByEmail(email: string): Promise<Provider> {
    const emailExists = await this.repository.findOne(email);

    return emailExists
  }
  async delete(id: string): Promise<void>{
    await this.repository.delete(id)
  }
  async findById(id: string): Promise<Provider>{
    const provider = await this.repository.findOne(id);
    return provider;
  }
}

export { ProviderRepository };
