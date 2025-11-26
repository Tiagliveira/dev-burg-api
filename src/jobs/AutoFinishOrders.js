import cron from 'node-cron';
import Product from '../app/models/Product.js';
import Order from '../app/schemas/Order.js';

const HOURS_TO_AUTO_FINISH = 2;

const task = cron.schedule('*/10 * * * *', async () => {
  console.log('[CRON] Verificando pedidos esquecidos para finalizar');

  const limiteDate = new Date();
  limiteDate.setHours(limiteDate.getHours() - HOURS_TO_AUTO_FINISH);

  try {
    const oldOrders = await Order.find({
      status: { $in: ['PREPARING', 'READY', 'DELIVERING'] },
      createdAt: { $lt: limiteDate },
    });

    if (oldOrders.length === 0) {
      return;
    }

    for (const order of oldOrders) {
      await Order.updateOne(
        { _id: order._id },
        {
          status: 'DELIVERED',
          observation: `${order.observation}( Finalizado Automaticamente)`,
        },
      );

      if (order.products && order.products.length > 0) {
        for (const productData of order.products) {
          await Product.increment('sold_count', {
            by: productData.quantity,
            where: { id: productData.id },
          });
        }
      }
      console.log(`Pedido ${order._id} finalizado automaticamente.`);
    }
  } catch (err) {
    console.error('Erro no cron job de Auto_Finish:', err);
  }
});

export default task;
