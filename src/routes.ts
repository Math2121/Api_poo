import { Router } from "express";
import { BalanceStockController } from "./controllers/BalanceStockController";

import { ClientsController } from './controllers/ClientsController' // PascalCase
import { ProductsController } from './controllers/ProductsController'
import { ProviderController } from "./controllers/ProviderController";
import { PurchaseOrderController } from "./controllers/PurchaseOrderController";
import { SalesOrdersController } from "./controllers/SalesOrdersController"

const routes = Router();

const clientsController = new ClientsController() //CameCase
routes.post('/clients', clientsController.create)
routes.get('/clients', clientsController.index)
routes.get('/clients/:id', clientsController.show)
routes.delete('/clients/:id', clientsController.delete) 
routes.put('/clients/:id', clientsController.update)

const productsController = new ProductsController()
routes.post('/products', productsController.create)
routes.get('/products', productsController.index)
routes.get('/products/:id', productsController.show)
routes.delete('/products/:id', productsController.delete) 
routes.put('/products/:id', productsController.update)

const salesOrdersController = new SalesOrdersController()
routes.post('/salesorders', salesOrdersController.create)
routes.get('/salesorders', salesOrdersController.index)

const providerController = new ProviderController()
routes.post('/provider', providerController.create)
routes.get('/provider', providerController.list)
routes.delete('/provider/:id', providerController.delete)

const purchaseOrderController = new PurchaseOrderController()
routes.post('/purchase_order', purchaseOrderController.create)
routes.get('/purchase_order', purchaseOrderController.list)
routes.delete('/purchase_order/:id', purchaseOrderController.delete)

const balanceStockController = new BalanceStockController();
routes.post('/balance_stock', balanceStockController.create);
routes.get('/balance_stock', balanceStockController.index);
routes.delete('/balance_stock/:id', balanceStockController.delete);

export { routes }