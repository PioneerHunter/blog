<template>
  <div id="header">
    <div class="grid">
      <div></div>
      <h1>My Drf-Vue Blog</h1>
      <div class="search">
        <form>
          <input
            type="text"
            placeholder="输入搜索内容..."
            v-model="searchText"
          />
          {{ searchText }}
          <!-- 阻止表单原本的提交方法 -->
          <button @click.prevent="searchArticles"></button>
        </form>
      </div>
      <hr />
      <div class="login">
        <div v-if="hasLogin">欢迎，{{ username }}!</div>
        <router-link class="login-link" to="/login">登录</router-link>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BlogHeader",
  data: function () {
    return {
      searchText: "",
      username: "",
      hasLogin: false,
    };
  },
  methods: {
    searchArticles() {
      // 搜索栏为空时返回主页，该功能待考虑
      if (this.searchText === "") {
        this.$router.push({ name: "Home" });
      }

      // 字符串调用方法前记得判空
      let text = this.searchText;
      if (text !== "") {
        text = this.searchText.trim();
        console.log("成功！");
      }
      if (text.charAt(0) !== "") {
        this.$router.push({ name: "Home", query: { search: text } });
        console.log("搜索功能 可行");
      }
    },
  },
  mounted() {
    const that = this;
    const storage = localStorage;
    // 过期时间
    const expiredTime = Number(storage.getItem("expiredTime.myblog"));
    // 当前时间
    const current = new Date().getTime();
    // 刷新令牌
    const refreshToken = storage.getItem("refresh.myblog");
    // 用户名
    that.username = storage.getItem("username.myblog");

    // 初始token未过期
    if (expiredTime > current) {
      that.hasLogin = true;
    } else if (refreshToken !== null) {
      axios
        .post("/api/token/refresh", {
          refersh: refreshToken,
        })
        .then(function (response) {
          const nextExpiredTime = Date.parse(response.headers.date) + 60000;
          storage.setItem("access.myblog", response.data.access);
          storage.setItem("expiredTime.myblog", nextExpiredTime);
          storage.removeItem("refresh.myblog");
          that.hasLogin = true;
        })
        .catch(() => {
          storage.clear();
          that.hasLogin = false;
        });
    }
  },
};
</script>

<style lang="less" scoped>
// 布局
#header {
  text-align: center;
  margin-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.search {
  padding-top: 22px;
}

* {
  box-sizing: border-box;
}

// 搜索框
form {
  position: relative;
  width: 200px;
  margin: 0 auto;
}

input,
button {
  border: none;
  outline: none;
}

input {
  width: 100%;
  height: 35px;
  padding-left: 13px;
  padding-right: 46px;
}

button {
  height: 35px;
  width: 35px;
  cursor: pointer;
  position: absolute;
}

.search input {
  border: 2px solid gray;
  border-radius: 5px;
  background: transparent;
  top: 0;
  right: 0;
}

.search button {
  background: gray;
  border-radius: 0 5px 5px 0;
  width: 45px;
  top: 0;
  right: 0;
}

.search button:before {
  content: "搜索";
  font-size: 13px;
  color: white;
}

// 注册
.login-link {
  color: black;
}

.login {
  text-align: right;
  padding-right: 5px;
}
</style>
