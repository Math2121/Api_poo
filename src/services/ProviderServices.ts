import { Provider } from "../entities/Provider";
import { ProviderRepository } from "../repositories/ProviderRepository";

interface IProviderCreate {
  name: string;
  email: string;
}
class ProviderServices {
  private providerRepository: ProviderRepository;
  constructor() {
    this.providerRepository = new ProviderRepository();
  }

  async create({ name, email }: IProviderCreate): Promise<void> {
    const emailExist = await this.providerRepository.findByEmail(email);

    if (emailExist) {
      throw new Error("Email already exists");
    }
    try {
      const provider = await this.providerRepository.create({ name, email });
    } catch (error) {
      console.error(error.message);
    }
  }

  async list(): Promise<Provider[]> {
    const providers = await this.providerRepository.listAll();

    return providers;
  }

  async delete(id: string): Promise<void> {
    const provider = await this.providerRepository.findById(id);
    if (!provider) {
      throw new Error("Provider not exist!");
    }
    await this.providerRepository.delete(id);
  }
}
export { ProviderServices };
