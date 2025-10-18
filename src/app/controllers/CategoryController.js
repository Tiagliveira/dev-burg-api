import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;

    const existingCategory = await Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return response.status(400).json({ error: 'Category alreadi exists' });
    }

    const newCategory = await Category.create({
      name,
    });

    return response.status(201).json({ newCategory });
  }
  async index(_request, response) {
    const categories = await Category.findAll();

    console.log(_request.userId);

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
