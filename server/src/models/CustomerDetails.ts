import { Model, DataTypes } from '@sequelize/core';
import sequelize from '../config/database';

class CustomerDetails extends Model {
  declare cust_id: string;
  declare company_name: string;
  declare company_desc: string;
  declare contact_name: string;
  declare address1: string | null;
  declare address2: string | null;
  declare address3: string | null;
  declare address4: string | null;
  declare address5: string | null;
  declare city: string;
  declare district: string;
  declare zip_code: string;
  declare state: string;
  declare country: string;
  declare email: string;
  declare phone_no1: string | null;
  declare phone_no2: string | null;
  declare password_arg1: string | null;
  declare password_arg2: string | null;
  declare create_date: Date;
  declare active_flag: string;
}

CustomerDetails.init(
  {
    cust_id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      defaultValue: sequelize.literal("'CUST'||nextval('vo_dashboard.s_customer_details')"),
      field: 'cust_id'
    },
    company_name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    company_desc: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    contact_name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    address1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    address3: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    address4: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    address5: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    district: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    zip_code: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: 'INDIA'
    },
    email: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    phone_no1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    phone_no2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    password_arg1: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    password_arg2: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    active_flag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'N'
    }
  },
  {
    sequelize,
    tableName: 't_customer_details',
    schema: 'vo_dashboard',
    timestamps: false
  }
);

export default CustomerDetails; 
