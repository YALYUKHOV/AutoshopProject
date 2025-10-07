const { User, Cart } = require("../models/models");
const ApiError = require("../error/APIError");

class UserController {

  async registration(req, res, next) {
    try {
      const { name, email, password_hash, role } = req.body;

      if (!email || !password_hash || !name) {
        return next(ApiError.badRequest("Укажите name, email и password!"));
      }

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return next(ApiError.conflict("Пользователь с данным email уже существует!"));
      }

      const user = await User.create({ name, email, password_hash, role });
      const cart = await Cart.create({ user_id: user.id });
      
    } catch (error) {
      return next(ApiError.internal("Ошибка при регистрации"));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password_hash } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь с данным email не найден"));
      }
      
    } catch (error) {
      return next(ApiError.internal("Ошибка при входе в аккаунт"));
    }
  }

  async getAll(req, res, next) {
    try {
      const all_users = await User.findAll();
      return res.json(all_users);
    } catch (error) {
      return next(ApiError.internal("Непредвиденная ошибка"));
    }
  }

  async check_auth(req, res, next) {
    
  }

  async delete(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return next(ApiError.notFound("Пользователь не найден"));
      }

      const cart = await Cart.findOne({ where: { user_id: userId } });
      if (cart) {
        await cart.destroy();
      }

      await user.destroy();

      return res.json({ message: "Аккаунт успешно удален" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Ошибка при удалении пользователя"));
    }
  }
}

module.exports = new UserController();