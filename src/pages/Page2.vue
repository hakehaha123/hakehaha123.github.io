<template>
  <div>
    <div class="back no-drag"><a href="javascript:;" @click="$router.go(-1)">< Back</a></div>
    <h1>{{ title || "Test Title" }}</h1>
    <article>
      {{ description || "Test content." }}
      <div>
        <h2>Video</h2>
        <Xgplayer :config="config" @player="Player = $event" />
      </div>
      <div>
        <h2>Music</h2>
        <audio controls style="max-height: 100%;max-width: 100%;">
          <source src="http://rnjmvhdht.bkt.clouddn.com/gyz.mp3" type="audio/ogg">
          <source src="http://rnjmvhdht.bkt.clouddn.com/gyz.mp3" type="audio/mpeg">
        </audio>
      </div>
      <div>
        <h3><span>Lonely Warrior</span></h3>
        <p>Everything
          is brave</p>
        <p>The
          wounds on your forehead, your being different, your mistakes</p>
        <p>You
          don’t have to hide any of that</p>
        <p>Your
          shabby toys, your mask, your own self</p>
        <p>
        </p>
        <p>They
          say you have to tame every monster with light</p>
        <p>They
          say you have to stitch up your wounds, for no one would love a buffoon</p>
        <p>Why
          can’t loneliness be glorious?</p>
        <p>Only
          the imperfect people are worthy of praise in songs</p>
        <p>Who
          said those covered in mud can’t be called heroes?</p>
        <p>
        </p>
        <p>I
          love your lonely figure walking down the dark alley</p>
        <p>I
          love the way you don’t kneel down</p>
        <p>I
          love how you confronted despair face-to-face</p>
        <p>Never
          giving in to tears</p>
        <p>
        </p>
        <p>I
          love that you wear tattered clothes</p>
        <p>Yet
          you still dare to jam fate’s gun</p>
        <p>I
          love how we’re so similar</p>
        <p>Even
          sharing the same flaws</p>
        <p>
        </p>
        <p>Should
          I go? Is it worth the effort? This ragged cloak</p>
        <p>Should
          I fight? Let’s fight! With the lowliest dreams</p>
        <p>To
          honor those quiet sobs and angry roars in the dark</p>
        <p>Who
          said only those standing in the light can be called heroes?</p>
        <p>
        </p>
        <p>They
          say you have to stop your madness like washing off the dirt</p>
        <p>They
          say you have to walk up the stairs obediently or the price will be bowing your head</p>
        <p>Then
          let me choose not to ride the wind</p>
        <p>You
          still carry that pride, that lonely courage</p>
        <p>Who
          said ordinary players can't be called heroes?</p>
        <p>
        </p>
        <p>I
          love your lonely figure walking down the dark alley</p>
        <p>I
          love the way you don’t kneel down</p>
        <p>I
          love how you confronted despair face-to-face</p>
        <p>Never
          giving in to tears</p>
        <p>
        </p>
        <p>I
          love that you wear tattered clothes</p>
        <p>Yet
          you still dare to jam fate’s gun</p>
        <p>I
          love how we’re so similar</p>
        <p>Even
          sharing the same flaws</p>
        <p>
        </p>
        <p>Should
          I go? Is it worth the effort? This ragged cloak</p>
        <p>Should
          I fight? Let’s fight! With the lowliest dreams</p>
        <p>To
          honor those quiet sobs and angry roars in the dark</p>
        <p>Who
          said only those standing in the light can be called heroes?</p>
        <p>
        </p>
        <p>Your
          mottled spots are unique</p>
        <p>Your
          silence is deafening, You are the hero</p>
        <p>
        </p>
        <p>I
          love your lonely figure walking down the dark alley</p>
        <p>I
          love the way you don’t kneel down</p>
        <p>I
          love how you confronted despair face-to-face</p>
        <p>Never
          giving in to tears (You are the hero)</p>
        <p>
        </p>
        <p>I
          love how you come from the wild</p>
        <p>Never
          in your life borrowing anyone’s light</p>
        <p>You
          will build your kingdom</p>
        <p>On
          top of ruins</p>
        <p>
        </p>
        <p>Should
          I go? Let’s go! With the lowliest dreams
        </p>
        <p>Should
          I fight? Let’s fight! With the loftiest dreams</p>
        <p>To
          honor those quiet sobs and angry roars in the dark</p>
        <p>Who
          said only those standing in the light can be called heroes?</p>
      </div>
    </article>
    <div id="btn-to-top" class="abs-hide" @click="toTop(50)">
      <div style="margin-bottom: 2px;"><i class="cr cr-chevron-up cr-20" aria-hidden="true"></i></div>
      トップへ
    </div>
  </div>
</template>
  
<script lang="ts">
import Xgplayer from 'xgplayer-vue/src/xgplayer-vue.vue';
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Xgplayer
  }
})
export default class Page2 extends Vue {
  title = "";
  description = "";
  config = {
    id: 'vs',
    fluid: true,
    url: 'http://rnjmvhdht.bkt.clouddn.com/gyz.mp4',
    autoplay: true,
    muted: true,
    autoplayMuted: true
  };
  Player = null

  created() {
    console.log(this.$route.params)
    const { title = "", description = "" } = this.$route.params;
    this.title = title;
    this.description = description;
  }

  toTop(i: number) {
    let el = document.documentElement;
    el = el.scrollTop ? el : document.body; 
    el.scrollTop -= i;
    let timer: undefined | number | NodeJS.Timeout;
    if (el.scrollTop > 0) {
      timer = setTimeout(() => this.toTop(i), 16);
    } else {
      clearTimeout(timer);
    }
  }
}
</script>

<style lang="scss">
#btn-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  text-align: center;
  border: 1px solid #493B32;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  z-index: 10;
  font-size: 14px;
  border-radius: 50%
}

@media screen and (max-width: 800px) {
  #btn-to-top {
    bottom: 15px;
    right: 15px;
    padding: 10px 8px;
    font-size: 12px;

    &:hover {
      background: #FFFFFF
    }
  }
}
</style>
  