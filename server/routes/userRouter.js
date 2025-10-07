const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", userController.check_auth);
router.get("/", userController.getAll);
router.delete("/",userController.delete);

module.exports = router;