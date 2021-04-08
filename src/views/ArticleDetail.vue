<template>
  <blog-header></blog-header>
  <div class="grid-container" v-if="article !== null">
    <div>
      <h1 id="title">{{ article.title }}</h1>
      <p id="subtiltle">
        本文由 {{ article.author.username }} 发布于
        {{ formatted_time(article.created) }}
      </p>
      <div class="article-body" v-html="article.body_html"></div>
    </div>
    <div>
      <h3>目录</h3>
      <div class="toc" v-html="article.toc_html"></div>
    </div>
  </div>
  <blog-footer></blog-footer>
</template>

<script>
import BlogHeader from "@/components/BlogHeader.vue";
import BlogFooter from "@/components/BlogFooter.vue";
import axios from "axios";

export default {
  name: "ArticleDetail",
  components: {
    BlogHeader,
    BlogFooter,
  },
  data: function () {
    return {
      article: null,
    };
  },
  mounted() {
    axios
      .get("/api/article/" + this.$route.params.id) // 拼接接口，$route获得路由中的动态参数
      .then((response) => (this.article = response.data));
  },
  methods: {
    formatted_time: function (iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLacalDateString;
    },
  },
};
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
}
#title {
  text-align: center;
  font-size: x-large;
}
#subtitle {
  text-align: center;
  color: gray;
  font-size: small;
}
</style>

<style lang="less">
.article-body p img {
  max-width: 100%;
  border-radius: 50px;
  box-shadow: gray 0 0 20px;
}
.toc ul {
  list-style-type: none;
}
.toc a {
  color: gray;
}
</style>
