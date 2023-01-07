<template>
  <div class="container">
    <TopHeader></TopHeader>
    <div class="container-body">
      <router-view class="main-content-container"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopHeader from "./layout/TopHeader.vue";

@Component({
  components: {
    TopHeader
  }
})
export default class App extends Vue { }
</script>

<style lang="scss">
@import "./assets/scss/common.scss";

body {
  font-size: 13px;
  margin: auto;
  height: 100%;
  position: relative;
  font-size: 16px;
  color: #493b32;
  line-height: 1.4em;
  -webkit-tap-highlight-color: transparent;
}

body,
input,
button,
select,
option,
textarea {
  font-family: Noto Sans JP, Hiragino Kaku Gothic ProN, Arial, メイリオ, Meiryo, sans-serif;
}

body,
ul,
li,
button,
h1,
h2,
h3,
p {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

ul {
  list-style: none;
}

* {
  box-sizing: border-box;
}

a:link,
a:visited,
a:hover,
a:active {
  color: #16BFB7
}

a:link:hover,
a:visited:hover,
a:hover:hover,
a:active:hover {
  color: #0e7a75
}

img {
  vertical-align: top;
  border: none;
}

button,
input {
  outline: none;
  border: none;
  box-shadow: none;
  background: transparent;
}

.btn {
  display: inline-block;
  -webkit-appearance: none;
  position: relative;
  height: 36.4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0 28px;
  border: 1px solid transparent;
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px;
  text-decoration: none;
  line-height: 36.4px;
  background: #16BFB7;
  cursor: pointer;
}

.form-control {
  width: 100%;
  max-width: 540px;
  padding: 10px 8px;
  font-size: 16px;
  line-height: 1;
  border: solid 1px #d0d0d5;
  border-radius: 4px;
  background: #FFF;
  -webkit-appearance: none;

  &:-ms-input-placeholder {
    color: #CCC
  }

  &::placeholder {
    color: #CCC
  }

  &:focus {
    outline: 0;
    border: 1px solid #16BFB7
  }

  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed
  }
}

.back {
  cursor: pointer;
}

.container {
  position: relative;
  max-width: 100%;
  min-height: 100%;
  padding: 0;
  background: rgba(255, 255, 255, 0.93);
}

.main-content-container {
  width: 90%;
  max-width: 960px;
  position: relative;
  margin: auto;
  padding: 80px 20px 100px;
  transition: .5s padding-left;

  &.no-nav {
    max-width: 1100px;
    padding-left: 20px;
  }
}

@media screen and (max-width: 800px) {
  .main-content-container {
    padding: 60px 0 100px 0;
    width: 95%;

    &.no-nav {
      padding-left: 0px;
    }
  }
}
</style>
