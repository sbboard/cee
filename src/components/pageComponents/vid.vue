<template>
  <div id="vidPage">
    <h2 :class="[`${json[currentIndex].colorScheme}Color`]">
      {{ json[currentIndex].video.title }}
      <i
        class="far fa-eye"
        data-v-ae914fcc=""
        @click="infoWindow.infoOn = !infoWindow.infoOn"
      ></i>
    </h2>

    <Vue3DraggableResizable
      :initW="pageWidth"
      :initH="pageHeight"
      v-model:x="vidWindow.x"
      v-model:y="vidWindow.y"
      v-model:w="vidWindow.w"
      style="z-index: 2147483647"
      v-model:h="vidWindow.h"
      v-model:active="vidWindow.active"
      :draggable="true"
      :resizable="false"
      :class="[vidWindow.infoOn ? '' : 'hide-vid']"
    >
      <div id="vidWindow">
        <div id="infoHeader">
          Video
          <i
            @click="
              () => {
                vidWindow.infoOn = false;
                vidWindow.vidPlaying = false;
                vidWindow.vidStarted = false;
                vidWindow.seenOnce = false;
                vidWindow.currentTip = '';
                vidWindow.showMsg = false;
              }
            "
            class="far fa-window-close"
          ></i>
        </div>
        <div
          id="beginMsg"
          v-if="
            vidWindow.vidPlaying == false &&
            vidWindow.seenOnce == false &&
            this.vidWindow.vidStarted == false &&
            page == 'example'
          "
        >
          <p>Watch the entire video once through.</p>
          <p>
            Then, you will be able to see it again with more information
            appearing at key points.
          </p>
        </div>
        <div
          id="beginMsg"
          v-else-if="
            vidWindow.vidPlaying == false &&
            this.vidWindow.vidStarted == false &&
            page == 'lense'
          "
        >
          <p>Click Here to Watch the Video.</p>
        </div>
        <div
          id="midMessage"
          v-else-if="
            vidWindow.vidPlaying == false &&
            vidWindow.seenOnce == true &&
            this.vidWindow.vidStarted == false &&
            page == 'example'
          "
        >
          <p>
            This time, you will see more information at key points in the video.
          </p>
        </div>
        <div id="infoMessage" v-if="vidWindow.showMsg">
          <p>
            {{ vidWindow.currentTip }}
          </p>
        </div>
        <video
          controls
          @playing="vidPlayed"
          @play="() => (this.vidWindow.vidStarted = true)"
          @pause="() => (this.vidWindow.vidPlaying = false)"
          @ended="vidEnded"
          @seeked="vidSeeked"
          ref="video"
        >
          <source
            :src="`assets/video/${json[currentIndex].video.file}`"
            type="video/mp4"
          />
        </video>
        <div
          id="lenseBar"
          :class="vidWindow.currentLenseColor"
          v-if="page == 'lense'"
        >
          <i class="fas fa-search"></i> Current Lense:
          <select @change="lenseChange($event)">
            <option value="planningPoints|redColor">Planning</option>
            <option value="setupPoints|greenColor">Setup</option>
            <option value="culturePoints|purpleColor">Culture</option>
            <option value="exPoints|blueColor">Experiences</option>
            <option value="repPoints|yellowColor">Representation</option>
            <option value="none|noneColor">None</option>
          </select>
        </div>
      </div>
    </Vue3DraggableResizable>

    <Vue3DraggableResizable
      :initW="pageWidth"
      :initH="pageHeight"
      v-model:x="infoWindow.x"
      v-model:y="infoWindow.y"
      v-model:w="infoWindow.w"
      v-model:h="infoWindow.h"
      v-model:active="infoWindow.active"
      :draggable="true"
      :resizable="false"
      style="z-index: 2147483647"
      :class="[
        `${json[currentIndex].colorScheme}Color`,
        infoWindow.infoOn ? '' : 'hidden',
      ]"
    >
      <div id="infoWindow">
        <div id="infoHeader">
          Content
          <i
            @click="infoWindow.infoOn = !infoWindow.infoOn"
            class="far fa-window-close"
          ></i>
        </div>
        <table>
          <tr>
            <td>Area of Study</td>
            <td>{{ json[currentIndex].video.AoS }}</td>
          </tr>
          <tr>
            <td>Topic</td>
            <td>{{ json[currentIndex].video.topic }}</td>
          </tr>
          <tr>
            <td>Big Idea</td>
            <td>{{ json[currentIndex].video.bigIdea }}</td>
          </tr>
          <tr>
            <td>Concept</td>
            <td>{{ json[currentIndex].video.concept }}</td>
          </tr>
          <tr>
            <td>Grade Level</td>
            <td>{{ json[currentIndex].video.gradeLvl }}</td>
          </tr>
          <tr>
            <td>Standards</td>
            <td v-html="json[currentIndex].video.standards"></td>
          </tr>
        </table>
      </div>
    </Vue3DraggableResizable>
    <div id="stuffWrap">
      <img
        @click="vidWindow.infoOn = true"
        :src="`/assets/img/${json[currentIndex].video.thumbnail}`"
      />
      <p>{{ json[currentIndex].video.description }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";

export default defineComponent({
  components: { Vue3DraggableResizable },
  name: "vid",
  props: ["page"],
  data() {
    return {
      infoWindow: {
        infoOn: false,
        x: 100,
        y: 100,
        h: 100,
        w: 100,
        active: false,
      },
      vidWindow: {
        infoOn: false,
        x: 100,
        y: 100,
        h: 100,
        w: 100,
        active: false,
        vidPlaying: false,
        vidStarted: false,
        seenOnce: false,
        currentTip: "",
        currentLense: "planningPoints",
        currentLenseColor: "redColor",
        showMsg: false,
      },
    };
  },
  methods: {
    lenseChange(event) {
      let eventInfo = event.target.value.split("|");
      this.vidWindow.currentLense = eventInfo[0];
      this.vidWindow.currentLenseColor = eventInfo[1];
    },
    playCheck() {
      if (
        this.vidWindow.vidPlaying &&
        (this.vidWindow.seenOnce || this.page == "lense") &&
        this.vidWindow.currentLense != "none"
      ) {
        console.log(this.vidWindow.currentLense);
        let allStops = this.json[this.currentIndex].video[
          this.vidWindow.currentLense
        ].map((v) => {
          return v.cuetime;
        });
        if (allStops.includes(Math.floor(this.$refs.video.currentTime))) {
          let currentTipText = this.json[this.currentIndex].video[
            this.vidWindow.currentLense
          ].filter((v) => {
            return v.cuetime == Math.floor(this.$refs.video.currentTime);
          })[0].text;
          if (this.vidWindow.currentTip != currentTipText) {
            this.vidWindow.currentTip = currentTipText;
            this.vidWindow.showMsg = true;
            this.$refs.video.pause();
          }
        }
      }
    },
    vidEnded() {
      this.vidWindow.seenOnce = true;
      this.vidWindow.vidPlaying = false;
      this.vidWindow.vidStarted = false;
    },
    vidPlayed() {
      this.vidWindow.vidPlaying = true;
      this.vidWindow.showMsg = false;
    },
    vidSeeked() {
      this.vidWindow.vidPlaying = true;
      this.vidWindow.showMsg = false;
      this.vidWindow.currentTip = "";
    },
  },
  mounted() {
    setInterval(this.playCheck, 500);
  },
  computed: {
    json() {
      return this.$store.getters.getJSON;
    },
    currentIndex() {
      return this.$store.getters.getIndex;
    },
    currentPage() {
      return this.$store.getters.getPage;
    },
    pageHeight() {
      return 0;
    },
    pageWidth() {
      return 500;
    },
  },
});
</script>

<style lang="sass" scoped>
@import "../../../src/global.sass"

#lenseBar
  color: black
  padding: 0.5em
  background-color: white
  position: inherit
  z-index: 9
  select
    width: 100%
    margin-top: 0.5em
  &.redColor
    background-color: $darkRed
  &.greenColor
    background-color: $darkGreen
  &.yellowColor
    background-color: $darkYellow
  &.purpleColor
    background-color: $darkPurple
  &.blueColor
    background-color: $darkBlue
h2
  padding: .5em
  margin-bottom: 1em
  position: relative
  i
    font-size: 2em
    position: absolute
    right: 0.25em
    top: 0em
    color: white
    cursor: pointer
  &.redColor
    background-color: $midRed
#stuffWrap
  width: 100%
  @include mobile
    text-align: center
    margin-bottom: 4em
  img
    width: 30%
    float: left
    box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, .5)
    cursor: pointer
    filter: brightness(1)
    transition: filter .25s, box-shadow .25s
    @include mobile
      display: none
    &:hover
      filter: brightness(0.9)
      box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, .2)
    @include mobile
      max-height: 50vh
      max-width: 100%
      width: auto
      margin: 0 auto
      margin-bottom: 1em
      float: none
  p
    display: block
    margin-left: calc(30% + 1em)
    text-align: left
    @include mobile
      margin-left: 0

#infoWindow
  background-color: white
  background-color: white
  overflow: hidden
  border-radius: 0.5em
  box-shadow: 0px 5px 15px -7px #000000f2
  border: 2px solid black
  @include mobile
    border-radius: 0
    box-shadow: initial
    border: 0
    margin-bottom: 1em
  #infoHeader
    width: calc(100% - 1em)
    background-color: gray
    color: white
    font-size: 1.25em
    padding: .5em
    i
      float: right
      cursor: pointer
    @include mobile
      cursor: inherit
      i
        cursor: inherit
  table
    border-collapse: collapse
    border-spacing: 0
    max-height: 20em
    display: block
    overflow-y: scroll
    td
      padding: 0.5em
    td:first-child
      width: 25%
      text-align: right
#vidWindow
  background-color: white
  background-color: white
  overflow: hidden
  border-radius: 0.5em
  box-shadow: 0px 5px 15px -7px #000000f2
  border: 2px solid black
  line-height: 0
  position: relative
  @include mobile
    margin-bottom: 1rem
    font-size: 2vw
    border-radius: 0
    box-shadow: initial
    border: 0
  #beginMsg, #midMessage, #infoMessage
    position: absolute
    line-height: initial
    text-align: center
    flex-direction: column
    font-weight: bold
    background-color: rgba(white,.9)
    width: calc(100% - 6rem)
    cursor: pointer
    height: calc(100% - 6rem)
    display: flex
    justify-content: center
    pointer-events: none
    padding: 0 3em 3em 3em
    @include mobile
      padding: 0 3rem 6rem 3rem
    p
      padding: .5rem
  #infoHeader
    width: calc(100% - 1em)
    background-color: gray
    color: white
    cursor: pointer
    font-size: 1.25em
    padding: .5em
    line-height: initial
    @include mobile
      cursor: inherit
      display: none
      i
        cursor: inherit
    i
      float: right
      cursor: pointer
  video
    width: 100%
    outline: none
    cursor: pointer
.hidden
  display: none !important
.hide-vid
  display: none
  @include mobile
    display: block
.vdr-container
  @include mobile
    position: inherit
    width: 100% !important
    height: initial !important
    display: block
#infoHeader .far
  @include mobile
    display: none !important
.vdr-container.active
  border: none !important
  z-index: 90000
.vdr-container
  &.redColor
    #infoWindow
      table
        td:first-child
          background-color: $midRed
</style>
