import { Request, Response } from "express";
import { ProviderServices } from "../services/ProviderServices";

class ProviderController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const providerService = new ProviderServices();
    try {
      providerService.create({ name, email });
      return response.status(204).json({ message: "Provider create" });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const providerService = new ProviderServices();
    try {
      const providers = await providerService.list();
      return response.status(200).json(providers);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    console.log(id)
    const providerService = new ProviderServices();
    try {
      await providerService.delete(id);
      return response.status(204);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
export { ProviderController };
