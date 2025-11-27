import Sequelize, { Model } from 'sequelize';

class DeliveryTax extends Model {
  static init(sequelize) {
    super.init(
      {
        zip_code_start: Sequelize.INTEGER,
        zip_code_end: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'delivery_taxes',
      },
    );
    return this;
  }
}

export default DeliveryTax;
