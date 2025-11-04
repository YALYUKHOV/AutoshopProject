const Router = require("express");
const router = new Router();

router.post("/", checkRole("admin"), ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.put("/:id", checkRole("admin"), ProductController.update);
router.delete("/:id", checkRole("admin"), ProductController.delete);

module.exports = router;