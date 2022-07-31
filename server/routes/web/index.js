module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");

  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({ name: "新闻分类" });
    const cats = await Category.find().where({ parent: parent }).lean();
    const newsTitles = [
      "7月29日全服不停机更新公告",
      "王者夏日直播节开启，2022快手定制回城限时领！",
      "为本命英雄打call 赢现金皮肤",
      "解决办赛痛点！王者荣耀全民电竞办赛系统“王者赛宝”登场",
      "峡谷夏日特别行动之狄某有话说|开局挂机还有理？不可取！",
      "王者夏日直播节开启，2022快手定制回城限时领！",
      "为本命英雄打call 赢现金皮肤",
      "谁是夏日王者？",
      "王者夏日直播节开启，斗鱼定制回城免费领！",
    ];
    const newsList = newsTitles.map((title) => {
      const randomList = cats.slice(0).sort(() => Math.random() - 0.5);

      return {
        categories: randomList.slice(0, 2),
        title: title,
      };
    });

    await Article.deleteMany({});
    await Article.insertMany(newsList);
    res.send(newsList);
  });

  router.get("/news/list", async (req, res) => {
    const parent = await Category.findOne({ name: "新闻分类" });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList",
        },
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] },
        },
      },
    ]);

    const subCats = cats.map((v) => v._id);
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({ categories: { $in: subCats } })
        .limit(5)
        .populate("categories")
        .lean(),
    });

    cats.map((cat) => {
      cat.newsList.map((news) => {
        /**
         * 现在官网已经存在“热门”标签，所以对每条news判断是否存在“公告”分类，
         * 如果有就显示“公告”，否则显示“热门”
         */
        let isNotice;
        news.categories.forEach((category) => {
          noticeFlag = category.name == "公告" ? true : false;
          isNotice = isNotice || noticeFlag
        });
        news.categoryName = isNotice ? "公告" : cat.name;
        return news;
      });
    });

    res.send(cats);
  });

  app.use("/web/api", router);
};
