<template>
  <section class="main-content-container no-nav">
    <div class="page-header">
      <h1>LINEでログイン</h1>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th style="border-bottom:0;border-right:2px solid #B4A094;text-align: center">
            Comiruをすでに友達に追加済みの方<br>
            以下のアイコンをクリックしてログイン
          </th>
          <th style="border-bottom:0; text-align: center">
            ComiruをLINEではじめてお使いの方<br>
            以下のアイコンをクリックして友だち追加
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border-top:0;border-right:2px solid #B4A094" align="center">
            <a style="display:inline-block;width:36px;height:36px;"
              href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&amp;client_id=1567784603&amp;redirect_uri=https%3A%2F%2Fcomiru.jp%2Fauth%2Fcheck_social_account%3Fidentity_type%3Dline&amp;state=fbbefa8d-542e-4032-9b26-68bf9f7ce4b0-school-id-1&amp;scope=openid%20profile&amp;bot_prompt=aggressive">
              <img style="display:inline-block;width:100%;" src="@/assets/images/btn_base.png">
            </a>
          </td>
          <td style="border-top:0" align="center">
            <a href="https://line.me/R/ti/p/%40onw0127a"><img height="36" alt="友だち追加"
                src="@/assets/images/ja.png"></a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="page-header">
      <h1>生徒・保護者ログイン<span>（スクールポパー）</span></h1>
    </div>
    <p>生徒番号とパスワードを入力してログインしてください。<span style="font-size:larger;color:#000000;">生徒番号</span>や<span
        style="font-size:larger;color:#000000;">パスワード</span>がわからない場合は、教室にお問い合わせください。</p>
    <ul v-show="showErrors" class="errors">
      <li v-show="!studentNo">生徒番号 を入力してください</li>
      <li v-show="!password">パスワード を入力してください</li>
    </ul>
    <div class="form-group">
      <label><input type="radio" name="role" value="parent" checked> 保護者</label>
      <label><input type="radio" name="role" value="subStudent"> 生徒</label>
    </div>
    <div class="form-group">
      <label for="student-no" class="form-label">生徒番号</label>
      <input type="text" name="student_no" id="student-no" v-model.trim="studentNo" class="form-control">
    </div>
    <div class="form-group">
      <label for="password" class="form-label">パスワード</label>
      <input type="password" name="password" id="password" v-model.trim="password" class="form-control">
    </div>
    <div class="form-group">
      <label for="show-password" class="form-label">
        <input type="checkbox" id="show-password">
        パスワードを表示
      </label>
    </div>
    <div class="form-group form-group-btn">
      <button class="btn" style="background: #16bFb7;" @click="toPage2">ログインする</button>
    </div>
    <div>
      <li><a href="/students/reset/password">パスワードを忘れた方はこちら</a></li>
    </div>
  </section>
</template>
  
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { debounce } from "../utils";

@Component({})
export default class Page3 extends Vue {
  studentNo = "";
  password = "";
  toPage2: any;
  showErrors = false;

  created() {
    this.toPage2 = debounce(() => {
      if (!this.studentNo || !this.password) {
        this.showErrors = true;
        return;
      }
      this.showErrors = false;
      console.log("toPage2...");
      this.$router.replace({
        name: 'Page2'
      })
    }, 2500, true)
  }
}
</script>
  
<style lang="scss">
.page-header {
  &::after {
    clear: both;
    content: "";
    display: table;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 25px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    font-weight: bold;

    span {
      font-size: 80%
    }
  }

}

.scroll-panel .table,
.scroll-panel .exam-score-table,
.scroll-panel .exam-my-score-table {
  min-width: 800px
}

.table-container {
  overflow-x: auto;
  overflow-x: overlay
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px
}

.table>thead>tr>th,
.table>thead>tr>td,
.table>tbody>tr>th,
.table>tbody>tr>td,
.table>tfoot>tr>th,
.table>tfoot>tr>td {
  padding: 6px;
  vertical-align: top;
  border-top: 1px solid #e8e8e8
}

.table>thead>tr>th {
  color: #8A8A8F;
  vertical-align: bottom;
  border-bottom: 1px solid #d0d0d5
}

.table>thead:first-child>tr:first-child>th,
.table>thead:first-child>tr:first-child>td {
  border-top: 0
}

.form-group {
  margin: 10px 0
}

.form-label {
  display: block;
  margin: 6px 0 3px;
  font-weight: 700
}

.form-group-btn {
  margin: 20px 0
}

.errors,
.errors li {
  margin: 0 !important;
  color: #E9754E;
}
</style>
  