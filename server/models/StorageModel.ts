import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";

interface StoragesAttributes {
  id: number;
  createdAt: Date;
  product_id: number;
  quantity: number;
  created_by: number;
}

export class storageModel
  extends Model<StoragesAttributes>
  implements StoragesAttributes
{
  public id!: number;
  public createdAt!: Date;
  public product_id!: number;
  public quantity!: number;
  public created_by!: number;
}

storageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "storage",
  }
);
