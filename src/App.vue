<template>
  <div id="header">
    <h1>My Drf-Vue Blog</h1>
    <hr />
  </div>

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

  <div id="footer">
    <p>guoqy.com</p>
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
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Georgia, Arial, sans-serif;
  margin-left: 40px;
  margin-right: 40px;
}
#header {
  text-align: center;
  margin-top: 20px;
}
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: whitesmoke;
  text-align: center;
  font-weight: bold;
}
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
