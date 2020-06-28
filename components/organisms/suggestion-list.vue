<template>
  <transition name="slide-fade">
    <div v-if="shown" class="suggestions-list">
      <section class="suggestions">
        <ul>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
          <li>
            <activity-name
              class="name"
              color="#f00"
              description="データベースを構築"
            />
          </li>
        </ul>
      </section>
    </div>
  </transition>
</template>

<script>
import ActivityName from '@/components/molecules/activity-name';

export default {
  components: {
    ActivityName,
  },
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.suggestions-list {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 91px;
  box-sizing: border-box;
  max-width: calc(100vw - #{$side-bar-min-width});
  background-color: $backdrop-color;
}
.suggestions {
  position: absolute;
  animation-duration: 100ms;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  box-shadow: 0 10px 6px $shadow-dark;
  background-color: $white;
  overflow: hidden;
  overflow-y: scroll;
  max-height: 395px;
}
.suggestions ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.suggestions li {
  display: flex;
  align-items: center;
  border-bottom: 1px $border solid;
  cursor: pointer;
  padding: 0 45px;
  width: 100%;
  height: 65px;
  transition: background-color 0.15s;
  &:hover {
    background-color: $background-hover;
  }
  &:last-child {
    border-bottom: 0;
    padding-bottom: 10px;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.15s;
  opacity: 1;
  .suggestions {
    transition: transform 0.15s;
    transform: translateY(0);
  }
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  .suggestions {
    transform: translateY(-10px);
  }
}
</style>
