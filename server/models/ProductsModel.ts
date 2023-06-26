import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";

interface ProductsAttributes {
  id: number;
  createdAt: Date;
  name: string;
}

export class productsModel
  extends Model<ProductsAttributes>
  implements ProductsAttributes
{
  public id!: number;
  public name!: string;
  public createdAt!: Date;
}

productsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);
