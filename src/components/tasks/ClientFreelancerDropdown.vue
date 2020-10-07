<template>
  <div>
    <b-dropdown boundary="window" variant="link" right class="client-buttons"
                toggle-class="p-0" v-if="showDropdown" no-caret>
      <template v-slot:button-content>
        <menu-icon/>
      </template>
      <b-dropdown-item-button v-if="hireEnabled" @click="hire" class="text-center">
        {{ $t('applications.hire') }}
      </b-dropdown-item-button>
      <b-dropdown-item-button v-if="completeEnabled" class="text-center"
                              @click="leaveFeedback(2)">
        {{ $t('applications.complete') }}
      </b-dropdown-item-button>
      <b-dropdown-divider/>
      <b-dropdown-item-button @click="leaveFeedback(3)" v-if="completeEnabled"
                              class="text-center">
        {{ $t('applications.cancel') }}
      </b-dropdown-item-button>
      <b-dropdown-item-button @click="leaveFeedback(null)" v-if="leaveFeedbackEnabled"
                              class="text-center">
        {{ $t('applications.leave_feedback') }}
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
import ClientButtons from '@/mixins/ClientButtons';
import { MenuIcon } from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ClientFreelancerDropdown',
  components: {
    MenuIcon,
  },
  mixins: [ClientButtons],
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  computed: {
    freelancer() {
      return this.application.freelancer;
    },

    fullName() {
      return this.freelancer.name;
    },

    showDropdown() {
      return [2, 3, 4].indexOf(this.application.status) === -1;
    },
  },
};
</script>

<style scoped>

</style>
