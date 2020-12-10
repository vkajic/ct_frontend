<template>
  <b-modal :visible="active" @close="close" @hidden="close"
           size="xl" :hide-footer="true" header-class="pt-4">
    <template slot="modal-header-close">
      <x-icon size="1.5x"/>
    </template>
    <template slot="modal-title">
      <div class="text-uppercase pl-lg-7">
        {{ $t('freelancers.invitation_title') }}
      </div>
    </template>
    <div class="px-lg-7 pb-5">
      <freelancers-search-item :freelancer="freelancer"
                               :id="freelancer.id"
                               :skills="skills"
                               class="mb-5"/>
      <b-form @submit.prevent="invite">
        <input-group name="job"
                     class="mb-3"
                     v-model="form.job"
                     :placeholder="$t('freelancers.select_job_placeholder')"
                     :label="$t('freelancers.select_job_label')"
                     :options="tasks"
                     :validation="$v.form.job"/>

        <textarea-group name="letter"
                        class="mb-4"
                        v-model="form.letter"
                        :label="$t('freelancers.invitation_message_label')"
                        :rows="12"
                        :validation="$v.form.letter"/>

        <div class="pt-5 d-flex justify-content-end align-items-center">
          <loading-button type="submit" variant="info" class="btn-round"
                          :label="$t('freelancers.invitation_send_button')"
                          :loading-label="$t('freelancers.invitation_sending_button')"
                          :loading="inviting"/>
        </div>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { XIcon } from 'vue-feather-icons';
import LoadingButton from '@/components/ui/LoadingButton.vue';
import InputGroup from '@/components/form/InputGroup.vue';
import FreelancersSearchItem from '@/components/client/FreelancersSearchItem.vue';
import TextareaGroup from '@/components/form/TextareaGroup.vue';
import apiService from '@/services/api.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'InviteToJobModal',
  components: {
    LoadingButton,
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
    /**
     * List of tasks for dropdown
     * @return {{text: *, value: string}[]}
     */
    tasks() {
      return this.$store.state.tasks.myTasks
        .map(t => ({
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
            text: this.$t('freelancers.invitation_success_message'),
          });

          // end loading
          this.inviting = false;

          // reset form data
          this.form = {
            job: null,
            letter: null,
          };
          // reset form validation
          this.$v.$reset();

          // close modal
          this.$emit('close');
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: this.$t(`freelancers.invitation.${err.response.data.error}`),
          });
          this.inviting = false;
        }
      }
    },
  },
};
</script>
