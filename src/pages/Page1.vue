<template>
  <div>
    <div v-if="tags.length" class="flex col-12 search-area mt-small" :class="{ active: showTags }">
      <AutoComplete class="flex1 auto-complete" :items="tags" objectMatchkey="name" :template="{
        keys: ['name']
      }" @inputChanged="setInput" @onSelected="search" @focus="showTags = true" @blur="showTags = false" />
      <button class="btn search-btn" @click="search(searchInput)">search</button>
    </div>
    <div v-else class="loading">The tags of auto-complete is Loading...</div>
    <div v-if="query" class="back no-drag mt-bigger"><a href="javascript:;" @click="backToAll">&lt; Back to All</a></div>
    <div v-if="news.length">
      <template v-if="currList.length">
        <ul class="news-list">
          <li v-for="item in currList" :key="item['id']" @click="toDetail(item)" class="news-item">
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
  showTags = false;
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
    const res = await axios.get("/data/tag.json");
    this.tags = res.data;
  }

  async getNews() {
    const res = await axios.get("/data/news.json");
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

  backToAll() {
    this.searchInput = "";
    this.query = "";
    this.page = 1;
  }

  created() {
    this.getTags();
    this.getNews();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.auto-complete {
  padding: 0;
  input {
    border: solid 1px #16BFB7;
    outline: none;
    padding: 10px 10px 10px 20px;
    border-radius: 16px 0 0 16px;
    border-right: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ac__filtered-items {

    border: solid 1px #16BFB7 !important;

    .ac__filtered-item {
      padding: 5px 10px;
    }
    margin-top: -1px;
    margin-right: -100px;
  }
}

.search-btn {
  width: 100px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: solid 1px #16BFB7 !important;
}

.search-area {
  max-width: 600px;
  &.active {
    input {
      border-bottom-left-radius: 0;
    }
    .search-btn {
      border-bottom-right-radius: 0;
    }
  }
}

.no-result, .loading {
  margin: 20% auto 0;
  text-align: center;
}

.news-list {
  margin-top: 30px;
  li.news-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  .news-pic {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}}
</style>
