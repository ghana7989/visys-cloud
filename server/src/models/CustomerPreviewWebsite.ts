import { Model, DataTypes } from '@sequelize/core';
import sequelize from '../config/database';
import CustomerDetails from './CustomerDetails';

class CustomerPreviewWebsite extends Model {
  declare cust_id: string;
  declare preview_url: string;
  declare preview_url_date: Date;
  declare arg1: string | null;
  declare arg2: string | null;
  declare arg3: string | null;
}

CustomerPreviewWebsite.init(
  {
    cust_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: CustomerDetails,
        key: 'cust_id'
      }
    },
    preview_url: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    preview_url_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    arg1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    arg3: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 't_customer_preview_website',
    schema: 'vo_dashboard',
    timestamps: false
  }
);

CustomerPreviewWebsite.belongsTo(CustomerDetails, {
  foreignKey: 'cust_id'
});

export default CustomerPreviewWebsite; 
