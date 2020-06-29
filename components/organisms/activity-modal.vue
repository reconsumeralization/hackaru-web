<i18n src="@/assets/locales/components/organisms/activity-modal.json"></i18n>

<template>
  <modal :shown="shown" @hide="hide">
    <form @submit.prevent="updateActivity">
      <modal-header>
        {{ $t('editTimer') }}
      </modal-header>
      <div class="content">
        <modal-item>
          <input
            v-model="description"
            :placeholder="$t('description')"
            type="text"
          />
        </modal-item>
        <modal-item>
          <button type="button" class="project-button">
            <project-name v-bind="project" />
            <icon name="chevron-right-icon" class="is-large" />
          </button>
        </modal-item>
        <modal-item>
          <label>
            {{ $t('startedAt') }}
          </label>
          <datetime-picker v-model="startedAt" />
        </modal-item>
        <modal-item>
          <label>
            {{ $t('stoppedAt') }}
          </label>
          <datetime-picker v-model="stoppedAt" />
        </modal-item>
      </div>
      <modal-footer>
        <base-button type="submit" class="is-primary">
          {{ $t('update') }}
        </base-button>
        <base-button type="button" class="is-white" @click="deleteActivity">
          <icon name="trash-2-icon" class="is-danger" />
        </base-button>
      </modal-footer>
    </form>
  </modal>
</template>

<script>
import Modal from '@/components/molecules/modal';
import ModalItem from '@/components/molecules/modal-item';
import ModalHeader from '@/components/molecules/modal-header';
import ModalFooter from '@/components/molecules/modal-footer';
import DatetimePicker from '@/components/molecules/datetime-picker';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ProjectName from '@/components/molecules/project-name';
import UpdateActivity from '@/graphql/mutations/update-activity';
import DeleteActivity from '@/graphql/mutations/delete-activity';

export default {
  components: {
    Modal,
    ModalItem,
    ModalHeader,
    ModalFooter,
    DatetimePicker,
    BaseButton,
    Icon,
    ProjectName,
  },
  props: {
    activity: {
      type: Object,
      required: true,
    },
    shown: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: undefined,
      project: {},
      description: '',
      startedAt: undefined,
      stoppedAt: undefined,
    };
  },
  watch: {
    activity: {
      immediate: true,
      handler() {
        this.id = this.activity.id;
        this.description = this.activity.description;
        this.project = this.activity.project || {};
        this.startedAt = this.activity.startedAt;
        this.stoppedAt = this.activity.stoppedAt;
      },
    },
  },
  methods: {
    async updateActivity() {
      await this.$apollo.mutate({
        mutation: UpdateActivity,
        variables: {
          id: this.id,
          description: this.description,
          projectId: (this.project || {}).id,
          startedAt: this.startedAt,
          stoppedAt: this.stoppedAt,
        },
      });
      this.hide();
    },
    async deleteActivity() {
      if (window.confirm(this.$t('confirmDelete'))) {
        await this.$apollo.mutate({
          mutation: DeleteActivity,
          variables: {
            id: this.id,
          },
        });
        this.hide();
      }
    },
    hide() {
      this.$emit('update:shown', false);
    },
  },
};
</script>

<style scoped lang="scss">
.project-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border: 0;
  background: none;
  cursor: pointer;
  &:hover {
    opacity: 0.85;
  }
}
</style>
