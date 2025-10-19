import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: err.errors });
    }

    const { userId, userName } = request;
    const { products } = request.body;

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

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        category: product.category.name,
        quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'Pedido realizado com sucesso',
    };

    return response.status(201).json(order);
  }
}

export default new OrderController();
