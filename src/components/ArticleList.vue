<template>
  <div id="articles" v-for="article in info.results" v-bind:key="article.url">
    <div>
      <span v-for="tag in article.tags" v-bind:key="tag" class="tag">
        {{ tag }}
      </span>
    </div>

    <div class="article-title">
      {{ article.title }}
    </div>

    <div>{{ formatted_time(article.created) }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArticleList",
  data: function () {
    return {
      info: "",
    };
  },
  mounted() {
    // 获取后端返回数据，http://127.0.0.1:8000/api/article
    axios.get("/api/article").then((response) => (this.info = response.data));
  },
  methods: {
    // 获取文章的创建时间
    formatted_time: function (iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style lang="less" scoped>
#articles {
  padding: 10px;
}
.article-title {
  font-size: large;
  font-weight: bolder;
  color: black;
  text-decoration: none;
  padding: 5px 0 5px 0;
}
.tag {
  padding: 2px 5px 2px 5px;
  margin: 5px 5px 5px 0;
  font-family: Georgia, Arial, sans-serif;
  font-size: small;
  background-color: #4e4e4e;
  color: whitesmoke;
  border-radius: 5px;
}
</style>
