<template>
    <header class="new-header">
        <a href="/"><img class="logo" src="@/assets/images/logo.png" alt=""></a>
        <h1 class="header-title">塾専用コミュニケーション &amp;業務管理システム</h1>
        <nav :class="{ 'header-link-area': true, active: navShow }">
            <ul v-for="item in ['pc', 'mobile']" :key="item" :class="`nav-header nav-header--${item}`">
                <li v-for="index in 3" :key="index" class="header-link more-info">
                    <a href="javascript:;" class="left-tab" @click="linkTo(index)">{{ `Page${index}` }}</a>
                </li>
            </ul>
        </nav>
        <div class="menu-box" @click="navShow = !navShow">
            <label id="hamburger-1" :class="{ hamburger: true, active: navShow }">
                <span class="line line-01"></span>
                <span class="line line-02"></span>
                <span class="line line-03"></span>
            </label>
        </div>
    </header>
</template>
  
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "top-header",
    data() {
        return {
            navShow: false
        }
    },
    methods: {
        linkTo(index: number) {
            this.navShow = false;
            this.$router.push({
                name: `Page${index}`
            })
        }
    }
});
</script>
  
<style lang="scss" scoped>
header {
    width: 100%;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    position: fixed;
    height: auto
}

.new-header {
    height: 80px;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    padding: 0 40px;

    .logo {
        width: 172px;
        height: 40px
    }

    .header-title {
        font-weight: bold;
        margin-left: 16px;
        line-height: 20px;
        color: #493b32;
        font-size: 14px;
        width: 170px
    }

    .nav-header {
        width: 100%
    }

    .more-info a {
        position: relative
    }
}

.nav-header {
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -ms-flex-align: end;
    align-items: flex-end
}

@media screen and (min-width: 801px) {
    .nav-header--mobile {
        display: none !important
    }
}

@media screen and (max-width: 800px) {
    .new-header {
        height: 44px;
        padding: 0 16px
    }

    .new-header .header-link a {
        position: relative;
        font-size: 1.1rem;
        line-height: 28px;
        padding: 16px;
        color: #493b32;
        text-decoration: none;
        font-weight: bold;
        display: block;
        position: relative;
    }


    .new-header .header-link:hover>a {
        color: #493b32 !important
    }

    .new-header .logo {
        width: 86px;
        height: 20px
    }

    .new-header .header-link {
        margin-right: 0;
        border-radius: 0;
        padding: 0
    }

    .new-header .header-link a {
        position: relative;
        font-size: 1.1rem;
        line-height: 28px;
        padding: 16px
    }

    .new-header .nav-header {
        width: 100%
    }

    .new-header .more-info.active {
        background-color: #F8F8F8
    }

    .new-header .more-info.active:hover {
        background-color: #F8F8F8
    }

    .nav-header--pc {
        display: none !important
    }
}

@media screen and (min-width: 800px) {
    .new-header .more-info {
        padding-right: 28px
    }
}

.header-link-area {
    text-align: right;
    -ms-flex: 1;
    flex: 1
}

.menu-box {
    display: none
}


@media screen and (max-width: 990px) {
    .new-header .header-title {
        display: none
    }
}

.header-link {
    margin-right: 24px;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 4px;
    transition: background-color .3s;

    &:hover {
        background-color: #ececee
    }

    a {
        color: #493b32;
        text-decoration: none;
        font-weight: bold
    }
}

@media screen and (max-width: 1410px) and (min-width: 1301px) {
    .header-link {
        margin-right: 8px
    }
}

@media screen and (max-width: 1050px) and (min-width: 800px) {
    .header-link {
        margin-right: 8px
    }
}

@media only screen and (max-width: 800px) {
    #logo {
        text-align: left
    }

    .nav-header {
        display: block;
        text-align: left;
        padding-bottom: 75px
    }

    .header-link {
        display: block;
        color: #493b32;
        border-bottom: 0.5px solid #D0D0D5;
        text-align: left;
        font-weight: bold;

        margin-right: 0 a {
            display: block;
            position: relative
        }
    }

    .header-link-area.active {
        visibility: visible
    }

    .header-link-area {
        overflow: scroll;
        position: absolute;
        top: 44px;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #FFF;
        padding-bottom: 44px;
        visibility: hidden;
        border-top: 1px solid rgba(0, 0, 0, 0.2)
    }

    .menu-box {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        float: left;
        overflow: hidden;
        z-index: 100;
        width: 60px
    }

    .menu-box:before {
        content: " ";
        display: block;
        padding-top: 100%
    }

    .hamburger {
        width: 24px;
        cursor: pointer
    }

    #hamburger-1.active .line:nth-child(1) {
        transform: translateY(8px) rotate(45deg)
    }

    #hamburger-1.active .line:nth-child(2) {
        opacity: 0
    }

    #hamburger-1.active .line:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg)
    }

    .hamburger .line {
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: #493B32;
        margin: 4px 0;
        transition: all 0.3s ease-in-out
    }

    .hamburger .line:first-child {
        margin: 0 0 4px 0
    }

    .hamburger .line:last-child {
        margin: 4px 0 0 0
    }
}
</style>
  