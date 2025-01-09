import { Model, DataTypes, literal } from '@sequelize/core';
import sequelize from '../config/database';
import CustomerDetails from './CustomerDetails';

class CustomerPaymentDetails extends Model {
  declare cust_id: string;
  declare payment_id: string;
  declare payment_amount: number;
  declare payment_date: Date;
  declare payment_flag: string;
  declare arg1: string | null;
  declare arg2: string | null;
  declare arg3: string | null;
}

CustomerPaymentDetails.init(
  {
    payment_id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      defaultValue: literal("'PYMT'||nextval('vo_dashboard.s_customer_payment_details')"),
      allowNull: false
    },
    cust_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: CustomerDetails,
        key: 'cust_id'
      }
    },
    payment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    payment_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
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
    tableName: 't_customer_payment_details',
    schema: 'vo_dashboard',
    timestamps: false
  }
);

CustomerPaymentDetails.belongsTo(CustomerDetails, {
  foreignKey: 'cust_id'
});

export default CustomerPaymentDetails; 
