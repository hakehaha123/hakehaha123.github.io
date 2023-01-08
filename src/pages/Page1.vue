<template>
  <div>
    <div v-if="tags.length" class="col-12 search-area" :class="{ active: showTags, isfixed: fixedTop }">
      <div class="back-btn">
        <button class="semibold no-drag" @click="fixedTop = false">←</button>
      </div>
      <AutoComplete class="flex1 auto-complete" :items="tags" objectMatchkey="name" :template="{
        keys: ['name']
      }" v-model="searchInput" ref="_autoComplete" @focus="showTags = true, fixedTop = true" @blur="showTags = false" />
      <div class="search-btn">
        <button class="no-drag" @click="search(searchInput)">search</button>
      </div>
    </div>
    <div v-else class="loading">The tags of auto-complete is Loading...</div>
    <div v-if="query.length" class="back no-drag" :class="{  'isfixed': fixedTop }">
      <a href="javascript:;" @click="backToAll">&lt; Clear & back to home</a>
    </div>
    <div v-if="news.length" :class="{ 'search-result': true, 'isfixed': fixedTop }">
      <template v-if="currList.length">
        <ul class="news-list">
          <li v-for="item in currList" :key="item['id']" @click="toDetail(item)" class="news-item">
            <div class="pr-smaller">
              <h3 class="semibold">{{ item['title'] }}</h3>
              <p class="font-smaller">{{ item['desc'] }}</p>
            </div>
            <div class="news-pic flex-shrink0">
              <img v-lazyload="item['img']" src="/images/blocker.jpg" />
            </div>
          </li>
        </ul>
        <div class="mt-normal">
          <button class="btn" v-show="page > 1" @click="goPrevious">Previous page</button>
          <button class="btn" v-show="page < totalPage" @click="goNext">Next page</button>
        </div>
      </template>
      <div v-else-if="query.length" class="no-result">No result.</div>
    </div>
    <div v-else class="loading">News is Loading...</div>
    <div :class="{ 'pop-mask': true, hide: !popupShow }">
      <div class="pop-content">
        <div>{{ errorMsg }}</div>
        <button class="btn mt-normal" @click="popupShow = false">Confirm</button>
      </div>
    </div>
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
  searchInput = [];
  query: Array<string> = [];
  tags = [];
  news = [];
  page = 1;
  limit = 20;
  fixedTop = false;
  errorMsg = "";
  popupShow = false;

  get currNews() {
    return this.query.length ? this.news.filter((news: { 
      title: string, 
      desc: string 
    }) => {
      const str: string = this.query.join('|');
      const reg: RegExp = new RegExp(`${str}`, "i");
      return [news.title, news.desc].some((item) => reg.test(item));
    }) : this.news;
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

  showErrors(message: string) {
    this.errorMsg = message;
    this.popupShow = true;
  }

  search(query: Array<string>) {
    console.log(this.query)
    if (!query.length) {
      const message = "Please select at least one tag.";
      this.showErrors(message);
      return;
    }
    this.page = 1;
    this.query = query;
    // this.fixedTop = false;
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
    (this.$refs._autoComplete as Vue & { clear: Function }).clear();
    this.searchInput = [];
    this.query = [];
    this.page = 1;
  }

  created() {
    this.getTags();
    this.getNews();
  }
}
</script>

<style lang="scss">
.auto-complete {
  .ac__input_box {
    min-height: 37px;
    border-radius: 6px 0 0 6px;
  }

  .ac__filtered-items {
    .ac__filtered-item {
      padding: 5px 10px;
    }

    width: calc(100% + 100px);
  }
}

.back, .search-result {
  margin-top: 30px;
}

.back-btn {
  display: none;
}

.search-btn {
  display: flex;
  button {
    padding: 0;
    width: 100px;
    min-height: 37px;
    border-radius: 0 6px 6px 0;
    box-shadow: none;
    box-sizing: border-box;
    background: #16BFB7;
    color: white;
    cursor: pointer;
  }
}

.search-area {
  margin-top: 10px;
  max-width: 600px;
  display: flex;

  &.active {
    .auto-complete .ac__input_box {
      border-bottom-left-radius: 0;
    }

    .search-btn button {
      border-bottom-right-radius: 0;
    }
  }
}

@media screen and (max-width: 800px) {
  .search-area {
    margin-top: 0 !important;

    .search-btn button {
      width: 60px;
    }

    &.isfixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      max-width: none;

      .back-btn {
        display: flex;
        border: 1px solid #16BFB7;
        border-right: 0;
        background: white;
        box-sizing: border-box;
        button {
          width: 28px;
          color: #16BFB7;
          background: inherit;
          cursor: pointer;
        }
      }

      .auto-complete .ac__input_box {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        border-left: 0;
      }

      .auto-complete .ac__input_box,
      .search-btn button {
        border-radius: 0 !important;
      }

      .auto-complete .ac__filtered-items {
        margin-left: -29px;
        height: 100vh;
        max-height: none;
        padding-bottom: 40px;
        width: calc(100% + 89px);
      }
    }
  }
  .back.isfixed, .search-result.isfixed {
    margin-top: 0;
  }
  .news-list {
    li.news-item {
      .news-pic {
        width: 80px !important;
        height: 80px !important;
      }
    }
  }
}

.no-result,
.loading {
  margin: 20% auto 0;
  text-align: center;
}

.news-list {
  li.news-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 1px solid #eee;

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
  }
}

.pop-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1000;
  display: flex;
  .pop-content {
    border-radius: 6px;
    border: 1px solid #16BFB7;
    padding: 10px;
    background: white;
    opacity: 1;
    transition: transform .5s ease, opacity .5s ease-out;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    position: absolute;
    width: 240px;
    min-height: 100px;
    top: 20%;
    left: 50%;
    margin-left: -140px;
    text-align: center;
    transform: scale(1);
  }
  &.hide {
    visibility: hidden;
    .pop-content {
      opacity: 0;
      transform: scale(.8);
    }
  }
}
</style>
