const Router = require("express");
const router = new Router();

router.get("/", authMiddleware, cartController.getCart);

router.delete("/", authMiddleware, cartController.clearCart);

module.exports = router;