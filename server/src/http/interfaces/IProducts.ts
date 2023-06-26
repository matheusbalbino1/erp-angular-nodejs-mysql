import { OrderItem } from "sequelize";

export interface IProductsCreate {
  name: string;
}

export interface IProductUpdate {
  id: number;
}
export interface IProductDelete {
  id: number;
}

export interface IProductPagination {
  page: number;
  pageSize: number;
  orderBy: OrderItem;
}
