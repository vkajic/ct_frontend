<template>
  <b-modal :visible="active" @close="close" @hidden="close"
           size="xl" :hide-footer="true" header-class="pt-4">
    <template slot="modal-header-close">
      <x-icon size="1.5x"/>
    </template>
    <template slot="modal-title">
      <div class="text-uppercase pl-7">
        Invite to Job
      </div>
    </template>
    <div class="px-7 pb-5">
      <freelancers-search-item :freelancer="freelancer"
                               :id="freelancer.id"
                               :skills="skills"
                               class="mb-5"/>
      <b-form @submit.prevent="invite">
        <input-group name="job"
                     class="mb-3"
                     v-model="form.job"
                     placeholder="Select job"
                     label="Select job to invite to"
                     :options="tasks"
                     :validation="$v.form.job"/>

        <textarea-group name="letter"
                        class="mb-4"
                        v-model="form.letter"
                        label="Message"
                        :rows="12"
                        :validation="$v.form.letter"/>

        <div class="pt-5 d-flex justify-content-end align-items-center">
          <b-button type="submit" variant="info" class="btn-round" :disabled="inviting">
            <template v-if="!inviting">Sent Invite</template>
            <template v-if="inviting">Sending...</template>
          </b-button>
        </div>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { XIcon } from 'vue-feather-icons';
import InputGroup from '../form/InputGroup.vue';
import TextareaGroup from '../form/TextareaGroup.vue';
import FreelancersSearchItem from './FreelancersSearchItem.vue';
import apiService from '../../services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InviteToJobModal',
  components: {
    FreelancersSearchItem,
    TextareaGroup,
    InputGroup,
    XIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    freelancer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        job: null,
        letter: null,
      },
      inviting: false,
    };
  },
  validations: {
    form: {
      job: {
        required,
      },
      letter: {
        required,
      },
    },
  },
  created() {
    this.$store.dispatch('tasks/loadMyTasks');
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.myTasks.map(t => ({
        text: t.title,
        value: `${t.id}`,
      }));
    },
    skills() {
      return this.freelancer.skills ? this.freelancer.skills.map(s => s.name) : [];
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async invite() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.inviting = true;
        try {
          await apiService.post('/invitations', {
            taskId: this.form.job,
            freelancerId: this.freelancer.id,
            letter: this.form.letter,
          });
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'Invitation sent successfully',
          });
          this.inviting = false;
          this.$emit('close');
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: `Invitation sending failed. ${err.response.data.message}`,
          });
          this.inviting = false;
        }
      }
    },
  },
};
</script>
