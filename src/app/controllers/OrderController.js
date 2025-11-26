import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../schemas/Order.js';

const statusFlow = {
  CREATED: ['PREPARING', 'CANCELED'],
  PREPARING: ['READY', 'CANCELED'],
  READY: ['DELIVERING', 'CANCELED'],
  DELIVERING: ['DELIVERED'],
  DELIVERED: [],
  CANCELED: [],
};

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      observation: Yup.string(),
      paymentMethod: Yup.string().required(),
      paymentId: Yup.string().when('paymentMethod', (paymentMethod, schema) => {
        return paymentMethod === 'card' ? schema.required() : schema;
      }),

      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            observation: Yup.string(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { userId, userName } = request;
    const {
      products,
      observation: orderObservation,
      paymentId,
      paymentMethod,
    } = request.body;

    const productId = products.map((product) => product.id);

    const findeProducts = await Product.findAll({
      where: {
        id: productId,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProducts = findeProducts.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;
      const observation = products.find((p) => p.id === product.id).observation;

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        category: product.category.name,
        quantity,
        observation,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'CREATED',
      observation: orderObservation,

      paymentId,
      paymentMethod,
    };

    const newOrder = await Order.create(order);

    return response.status(201).json(newOrder);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
    const { status } = request.body;
    const { id } = request.params;

    try {
      const order = await Order.findById(id);

      if (!order) {
        return response.status(404).json({ error: 'Pedido não Encontrado' });
      }

      const allowedStatus = statusFlow[order.status];

      if (!allowedStatus || !allowedStatus.includes(status)) {
        return response.status(400).json({ error: `Status inválido` });
      }

      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(200).json({ message: 'status update successfully' });
  }

  async index(_request, response) {
    const orders = await Order.find();

    return response.status(200).json(orders);
  }

  async show(request, response) {
    try {
      const orders = await Order.find({ 'user.id': request.userId });
      return response.json(orders);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async cancel(request, response) {
    const { id } = request.params;
    const { userId } = request;

    try {
      const order = await Order.findOne({ _id: id, 'user.id': userId });
      if (!order) {
        return response.status(404).json({ error: 'Pedido não encontrado' });
      }

      const uncancelableStatus = [
        'READY',
        'DELIVERING',
        'DELIVERED',
        'CANCELED',
      ];
      if (uncancelableStatus.includes(order.status)) {
        return response.status(400).json({
          error:
            'Pedido ja está em andamento ou Finalizado e não pode ser cancelado.',
        });
      }
      const timeNow = new Date();
      const timeOrder = new Date(order.createdAt);

      const diffInMinutes = (timeNow - timeOrder) / 1000 / 60;

      if (diffInMinutes > 30) {
        return response
          .status(400)
          .json({ error: 'Tempo limite de cancelamento (30 min) expirado' });
      }
      await Order.updateOne({ _id: id }, { status: 'CANCELED' });

      return response.json({ message: 'Pedido Cnacelado com sucesso.' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new OrderController();
