<i18n src="@/assets/locales/components/organisms/timer-header.json"></i18n>

<template>
  <section class="timer-header">
    <form class="form" @submit.prevent="submit">
      <div v-tooltip="$t('selectProject')" class="project-button">
        <project-name v-bind="project" class="project-name" />
      </div>
      <input
        :value="description"
        :placeholder="$t('description')"
        type="text"
        class="description"
      />
      <ticker :started-at="startedAt" :class="['duration']" />
      <play-button :working="working" class="play-button" />
    </form>
    <suggestion-list v-if="false" />
  </section>
</template>

<script>
import NavModal from '@/components/organisms/nav-modal';
import ProjectName from '@/components/molecules/project-name';
import SuggestionList from '@/components/organisms/suggestion-list';
import Ticker from '@/components/atoms/ticker';
import PlayButton from '@/components/atoms/play-button';

export default {
  components: {
    NavModal,
    Ticker,
    ProjectName,
    SuggestionList,
    PlayButton,
  },
  props: {
    activity: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      id: undefined,
      description: '',
      project: {},
    };
  },
  computed: {
    working() {
      return !!this.id;
    },
  },
  watch: {
    activity: {
      immediate: true,
      handler() {
        if (this.activity) {
          this.id = this.activity.id;
          this.description = this.activity.description;
          this.project = this.activity.project;
          this.startedAt = this.activity.startedAt;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.timer-header {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100vw - #{$side-bar-min-width});
  z-index: index($z, timer-form);
  width: 100%;
  left: $side-bar-min-width;
}
.form {
  width: 100%;
  height: 91px;
  display: flex;
  border-radius: 5px;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px $border-dark solid;
  box-shadow: 0 3px 3px $shadow;
  z-index: 1;
}
.project-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 1px $border-dark solid;
  cursor: pointer;
}
.project-name {
  min-height: 100%;
  max-width: 200px;
  padding: 0 45px;
  opacity: 1;
  transition: transform 0.1s ease;
  &:hover {
    opacity: 0.85;
  }
  &:active {
    transform: scale(0.95);
  }
}
.description {
  line-height: 1;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  background: none;
  text-overflow: ellipsis;
  overflow: hidden;
}
.duration {
  font-size: 18px;
  align-self: center;
  line-height: 1;
  margin-right: 30px;
  font-family: $font-family-duration;
}
// .duration.stopped {
//   color: $text-light;
// }
// .base-button.control-button {
//   display: flex;
//   align-self: center;
//   flex-shrink: 0;
//   padding: 0;
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   margin-right: 40px;
//   pointer-events: auto;
//   border-radius: 50%;
//   box-shadow: 0 3px 3px $shadow-dark;
// }
// .base-button.control-button .icon {
//   width: 22px;
//   height: 22px;
// }
// .base-button.control-button.start .icon {
//   padding-left: 3px;
// }
// .form {
//   width: 100%;
//   justify-content: center;
//   height: 100%;
//   display: flex;
//   border-radius: 5px;
//   box-sizing: border-box;
// }
// .form .duration {
//   font-size: 18px;
//   align-self: center;
//   line-height: 1;
//   margin-right: 30px;
//   font-family: $font-family-duration;
// }
// .form .duration.show {
//   display: block;
// }
// .form-content {
//   z-index: 1;
//   display: flex;
//   flex: 1;
//   border-bottom: 1px $border-dark solid;
//   border-right: 0;
//   box-shadow: 0 3px 3px $shadow;
//   background-color: $background-translucent;
// }
// .project-wrapper {
//   display: flex;
//   align-items: center;
//   min-height: 100%;
//   border-right: 1px $border-dark solid;
//   cursor: pointer;
// }
// .selected-project {
//   display: flex;
//   max-width: 120px;
//   padding: 0 45px;
//   align-items: center;
// }
// .description {
//   line-height: 1;
//   border: 0;
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   padding: 0 40px;
//   display: flex;
//   background: none;
//   text-overflow: ellipsis;
//   overflow: hidden;
// }
// .dot-only {
//   display: none;
// }
// .suggestions-wrapper {
//   position: absolute;
//   animation-duration: 100ms;
//   width: 100%;
//   height: 100vh;
//   top: 91px;
//   box-sizing: border-box;
//   max-width: calc(100vw - #{$side-bar-min-width});
//   background-color: $backdrop-color;
// }
// .suggestions {
//   overflow-y: scroll;
//   box-sizing: border-box;
//   background-color: $background;
//   overflow: hidden;
//   overflow-y: scroll;
//   box-shadow: 0 3px 5px $shadow-darker;
//   -webkit-overflow-scrolling: touch;
//   max-height: 415px;
// }
// .suggestions ul {
//   margin: 0;
//   padding: 0;
// }
// .suggestions ul li {
//   display: flex;
//   cursor: pointer;
//   list-style-position: inside;
//   list-style-type: none;
//   text-align: center;
//   align-items: center;
//   height: 65px;
//   padding: 0 45px;
//   border-bottom: 1px $border solid;
//   transition: background-color 0.1s ease;
//   &:hover {
//     background-color: $background-hover;
//   }
// }
// @include mq(small) {
//   .timer-form {
//     max-width: 100vw;
//     left: 0;
//   }
//   .form {
//     height: auto;
//     padding: 0;
//     justify-content: flex-start;
//     margin: 0;
//     margin-top: 15px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     width: 100%;
//     padding: 0 30px;
//     max-width: 100%;
//     font-size: 17px;
//   }
//   .description::placeholder {
//     padding-top: 3px;
//   }
//   .project-wrapper {
//     display: flex;
//     justify-content: center;
//     min-width: 80px;
//     height: 100%;
//   }
//   .project-wrapper .selected-project {
//     display: none;
//   }
//   .dot-only {
//     display: flex;
//   }
//   .form-content {
//     order: 1;
//     position: fixed;
//     left: 0;
//     top: $side-bar-min-height;
//     border-radius: 0;
//     width: 100%;
//     border: 0;
//     height: 80px;
//     box-sizing: border-box;
//     border-bottom: 1px $border-dark solid;
//     box-shadow: 0 3px 3px $shadow;
//   }
//   .base-button.control-button {
//     width: 48px;
//     height: 48px;
//     margin-right: 16px;
//   }
//   .base-button.control-button.start .icon {
//     padding-left: 3px;
//   }
//   .base-button.control-button .icon {
//     width: 20px;
//     height: 20px;
//   }
//   .description {
//     margin: 0;
//     padding: 0 25px;
//     min-width: 1px;
//   }
//   .form .duration {
//     margin-right: 25px;
//     display: none;
//   }
//   .suggestions-wrapper {
//     position: absolute;
//     top: 80px;
//     border: 0;
//     margin: 0;
//     padding: 0;
//     max-width: 100vw;
//     width: 100%;
//     background: none;
//   }
//   .suggestions {
//     border-radius: 0;
//     height: 100vh;
//     border-top: 0;
//     border-left: 0;
//     margin: 0;
//     max-width: 100vw;
//     background-color: $background-translucent;
//     max-height: 100%;
//     padding-bottom: 550px;
//   }
//   .suggestions ul {
//     min-height: 130vh;
//   }
//   .suggestions ul li {
//     height: 75px;
//     padding: 0 35px;
//     border-bottom: 1px $border solid;
//     border-radius: 0;
//     &:first-child {
//       padding-top: 0;
//     }
//     &:last-child {
//       border-bottom: 1px $border solid;
//       padding-bottom: 0;
//     }
//     &:hover {
//       background: none;
//     }
//   }
// }
</style>
