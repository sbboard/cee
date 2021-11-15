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
    <div id="stuffWrap">
      <img
        @click="vidWindow.infoOn = true"
        :src="`/assets/img/${json[currentIndex].video.thumbnail}`"
      />
      <p>{{ json[currentIndex].video.description }}</p>
    </div>

    <Vue3DraggableResizable
      :initW="pageWidth"
      :initH="pageHeight"
      v-model:x="vidWindow.x"
      v-model:y="vidWindow.y"
      v-model:w="vidWindow.w"
      v-model:h="vidWindow.h"
      v-model:active="vidWindow.active"
      :draggable="true"
      :resizable="false"
      v-if="vidWindow.infoOn"
    >
      <div id="vidWindow">
        <div id="infoHeader">
          Video
          <i
            @click="
              () => {
                vidWindow.infoOn = false;
                vidWindow.vidPlaying = false;
              }
            "
            class="far fa-window-close"
          ></i>
        </div>
        <div id="beginMsg" v-if="vidWindow.vidPlaying == false">
          <p>Watch the entire video once through.</p>
          <p>
            Then, you will be able to see it again with more information
            appearing at key points.
          </p>
        </div>
        <video
          controls
          @playing="
            () => {
              vidWindow.vidPlaying = true;
            }
          "
        >
          <source
            :src="`assets/video/${json[currentIndex].video.file}`"
            type="video/mp4"
          />
        </video>
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
      v-if="infoWindow.infoOn"
      :class="[`${json[currentIndex].colorScheme}Color`]"
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";

export default defineComponent({
  components: { Vue3DraggableResizable },
  name: "vid",
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
      },
    };
  },
  methods: {
    print(val) {
      console.log(val);
    },
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
  img
    width: 30%
    float: left
    box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, .5)
    cursor: pointer
    filter: brightness(1)
    transition: filter .25s, box-shadow .25s
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
  #infoHeader
    width: calc(100% - 1em)
    background-color: gray
    color: white
    font-size: 1.25em
    padding: .5em
    i
      float: right
      cursor: pointer
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
  #beginMsg
    position: absolute
    top: 0
    line-height: initial
    text-align: center
    flex-direction: column
    font-weight: bold
    height: calc(100% - 6em)
    display: flex
    justify-content: center
    pointer-events: none
    padding: 3em
    p
      padding: .5em
  #infoHeader
    width: calc(100% - 1em)
    background-color: gray
    color: white
    font-size: 1.25em
    padding: .5em
    line-height: initial
    i
      float: right
      cursor: pointer
  video
    width: 100%
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
