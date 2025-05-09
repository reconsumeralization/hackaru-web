<i18n
  src="~/assets/locales/components/organisms/activity-editor-description.json"
></i18n>

<template>
  <div>
    <modal-item>
      <input
        :value="value"
        :placeholder="$t('description')"
        class="description"
        data-test-id="description"
        type="text"
        @focus="focus"
        @blur="blur"
        @input="input"
      />
    </modal-item>

    <transition>
      <div
        v-scroll-lock="true"
        v-if="focused && suggestions.length"
        data-test-id="suggestions"
        class="suggestions"
      >
        <ul>
          <li
            v-for="(suggestion, index) in suggestions"
            :key="index"
            data-test-id="suggestion"
            @click="clickSuggestion(suggestion)"
          >
            <activity-name v-bind="suggestion" />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import ActivityName from '~/components/molecules/activity-name';
import ModalItem from '~/components/molecules/modal-item';
import { mapGetters } from 'vuex';
import debounce from 'lodash.debounce';

export default {
  components: {
    ActivityName,
    ModalItem,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    ...mapGetters({
      suggestions: 'suggestions/all',
    }),
  },
  methods: {
    fetchSuggestions: debounce(function (text) {
      this.$store.dispatch('suggestions/fetch', text);
    }, 1000),
    input(e) {
      this.$emit('input', e.target.value);
      this.fetchSuggestions(e.target.value);
    },
    focus() {
      this.focused = true;
      this.fetchSuggestions('');
    },
    blur() {
      this.focused = false;
    },
    clickSuggestion({ description, project }) {
      this.$emit('input', description);
      this.$emit('select-project', project);
    },
  },
};
</script>

<style scoped lang="scss">
.suggestions {
  height: 317px;
  overflow: hidden;
  overflow: scroll;
  position: absolute;
  animation-duration: 100ms;
  width: 100%;
  box-shadow: 0 8px 5px -5px $shadow-dark inset;
  background-color: $background;
}
.suggestions ul {
  width: 100%;
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  padding-bottom: 200px;
}
.suggestions li {
  display: flex;
  padding: 0 30px;
  height: 65px;
  align-items: center;
  border-bottom: 1px solid $border;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: $background-hover;
  }
}
</style>
