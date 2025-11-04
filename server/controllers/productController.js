const { Product } = require("../models/models");
const ApiError = require("../error/APIError");

class ProductController {
    
    // фильтрацию по категории товара + пагинация
  async getAll(req, res, next) {
    try {
      let { categoryId, page, limit } = req.query;

      // Преобразуем page и limit в числа
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 1000;

      // Если categoryId не передан или не является числом, установим его как null
      categoryId = parseInt(categoryId, 10) || null;

      let offset = (page - 1) * limit;
      let product;

      // Фильтрация по категории товара
      if (categoryId) {
        product = await Product.findAndCountAll({
          where: { category_id: categoryId }, // Меняем на category_id, если в базе данных такой столбец
          limit,
          offset,
        });
      } else {
        product = await Product.findAndCountAll({
          limit,
          offset,
        });
      }

      return res.json(product);
    } catch (error) {
      console.error("Ошибка при получении данных о товарах:", error);
      return next(ApiError.internal("Ошибка при получении данных о товарах"));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const one_product = await Product.findOne({ where: { id } });

      if (!one_product) {
        return next(ApiError.notFound("Такого товара не найдено"));
      }

      return res.json(one_product);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении товара"));
    }
  }


}

module.exports = new ProductController();