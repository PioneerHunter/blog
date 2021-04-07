<template>
  <div id="articles" v-for="article in info.results" :key="article.url">
    <div>
      s
      <span v-for="tag in article.tags" :key="tag" class="tag">
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
  name: "App",
  data: function () {
    return {
      info: {},
    };
  },
  mounted() {
    axios.get("/api/article").then((response) => (this.info = response.data));
  },
  methods: {
    // 获取文章的创建时间
    formatted_time(iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString();
    }
  },
};
</script>

<style lang="less">
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
</style>
