<template>
  <div class="container">
    <div v-if="tags.length" class="auto-complete">
      <AutoComplete :items="tags" objectMatchkey="name" :template="{
        keys: ['name']
      }" @inputChanged="setInput" @onSelected="search" />
      <button @click="search(searchInput)">search</button>
    </div>
    <div v-else class="loading">The tags of auto-complete is Loading...</div>
    <div v-if="news.length">
      <template v-if="currList.length">
        <ul class="news-list">
          <li v-for="item in currList" :key="item['id']" @click="toDetail(item)">
            <div>
              <h3>{{ item['title'] }}</h3>
              <p>{{ item['desc'] }}</p>
            </div>
            <div class="news-pic">
              <img v-lazyload="item['img']" src="/images/blocker.jpg" />
            </div>
          </li>
        </ul>
        <div>
          <button class="btn" v-show="page > 1" @click="goPrevious">Previous page</button>
          <button class="btn" v-show="page < totalPage" @click="goNext">Next page</button>
        </div>
      </template>
      <div v-else-if="query" class="no-result">No result.</div>
    </div>
    <div v-else class="loading">News is Loading...</div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import AutoComplete from "../components/AutoComplete.vue";

@Component({
  components: {
    AutoComplete
  }
})
export default class Page1 extends Vue {
  searchInput = "";
  query = "";
  tags = [];
  news = [];
  page = 1;
  limit = 20;

  get currNews() {
    return this.query ? this.news.filter((item: any) =>  
      item.title.indexOf(this.query) > -1
    ) : this.news;
  }

  get currList() {
    const page: number = this.page;
    const limit: number = this.limit;
    const start: number = (page - 1) * limit;
    const end: number = start + limit;
    return this.currNews.slice(start, end)
  }

  get totalPage() {
    return Math.ceil(this.currNews.length / this.limit);
  }

  goPrevious() {
    this.page = Math.max(this.page - 1, 1);
  }

  goNext() {
    this.page = Math.min(this.page + 1, this.totalPage);
  }

  async getTags() {
    const res = await axios.get("/tag.json");
    this.tags = res.data;
  }

  async getNews() {
    const res = await axios.get("/news.json");
    this.news = res.data;
  }

  setInput(value: string) {
    this.searchInput = value;
  }

  search(query: string) {
    this.page = 1;
    this.query = query;
  }

  toDetail({ title = "", desc = "" }) {
    console.log(title, desc)
    this.$router.push({
      name: "Page2",
      params: {
        title,
        description: desc
      }
    })
  }

  created() {
    this.getTags();
    this.getNews();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

.no-result, .loading {
  margin: 20% auto 0;
  text-align: center;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

.auto-complete {
  width: 153px;
  display: flex;
  align-items: center;
}

.news-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .news-pic {
    width: 160px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
