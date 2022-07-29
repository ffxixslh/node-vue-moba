// 通用crud接口
module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../../models/AdminUser");
  const assert = require("http-assert");
  const router = express.Router({
    mergeParams: true,
  });

  // 创建资源
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send({ data: model });
  });

  // 更新资源
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send({ data: model });
  });

  // 删除资源
  router.delete("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      data: {
        success: true,
      },
    });
  });

  // 资源列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send({ data: items });
  });

  // 资源详情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send({ data: model });
  });

  /**
   * 删除全部数据
   */
  function deleteMany() {
    req.Model.collection.deleteMany({});
  }

  // 登录校验中间件
  const authMiddleWare = require("../../middleware/auth.js");

  // 资源子组件
  const resourceMiddleWare = require("../../middleware/resource.js");

  app.use(
    "/admin/api/rest/:resource",
    authMiddleWare(),
    resourceMiddleWare(),
    router
  );

  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleWare(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send({ data: file });
    }
  );

  app.set("secret", "1234567890abcdefg");

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select("+password");
    /**
     * 将
     * if (!variable) {
     *   return res.status(statusCode).send({
     *     message: "msg",
     *   });
     * }
     * 替换为assert(variable, statusCode, "msg")
     */
    assert(user, 422, "用户不存在");
    // 2.校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ data: { token } });
  });

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
