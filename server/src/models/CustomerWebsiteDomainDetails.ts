import { Model, DataTypes, literal } from '@sequelize/core';
import sequelize from '../config/database';
import CustomerDetails from './CustomerDetails';
import CustomerPaymentDetails from './CustomerPaymentDetails';

class CustomerWebsiteDomainDetails extends Model {
  declare cust_id: string;
  declare domain_id: string;
  declare payment_id: string;
  declare domain_name: string;
  declare website_deployed_flag: string;
  declare website_url: string;
  declare arg1: string | null;
  declare arg2: string | null;
  declare arg3: string | null;
}

CustomerWebsiteDomainDetails.init(
  {
    domain_name: {
      type: DataTypes.STRING(1000),
      primaryKey: true,
      allowNull: false
    },
    domain_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: literal("'DOMAIN'||nextval('vo_dashboard.s_customer_website_domain_details')")
    },
    cust_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: CustomerDetails,
        key: 'cust_id'
      }
    },
    payment_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: CustomerPaymentDetails,
        key: 'payment_id'
      }
    },
    website_deployed_flag: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: 'N'
    },
    website_url: {
      type: DataTypes.STRING(1000),
      allowNull: false
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
    tableName: 't_customer_website_domain_details',
    schema: 'vo_dashboard',
    timestamps: false
  }
);

CustomerWebsiteDomainDetails.belongsTo(CustomerDetails, {
  foreignKey: 'cust_id'
});

CustomerWebsiteDomainDetails.belongsTo(CustomerPaymentDetails, {
  foreignKey: 'payment_id'
});

export default CustomerWebsiteDomainDetails; 
