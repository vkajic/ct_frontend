<template>
  <b-form @submit.prevent="saveTask">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label>PROJECT TITLE</label>
          <b-form-input type="text"
                        class="form-control"
                        v-model="form.title"
                        :state="$v.form.title.$dirty ? !$v.form.title.$error : null"/>
        </div>
        <div class="form-group">
          <label>PROJECT DESCRIPTION</label>
          <b-form-textarea
            class="form-control"
            v-model="form.description"
            :state="$v.form.description.$dirty ? !$v.form.description.$error : null"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="secondary">
          <label>
            Worktime left
            <span class="gray transformnone">
                | <span class="italic">
                time in number of days which you think the freelancer can finish your job)</span>
              </span>
          </label>
          <div class="row">
            <div class="col-md-4">
              <b-form-input type="text"
                            class="form-control rounded-control gray"
                            v-model="form.worktime"
                            :state="$v.form.worktime.$dirty ? !$v.form.worktime.$error : null"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="secondary">
          <label>Task value</label>
          <b-form-input type="text"
                        class="form-control rounded-control dark"
                        v-model="form.price"
                        :state="$v.form.price.$dirty ? !$v.form.price.$error : null"/>
        </div>
      </div>
      <div class="col-2 text-center">
        <div class="plus">+</div>
      </div>
      <div class="col-5">
        <div class="secondary">
          <label>
            10% dispute escrow *
            <span class="gray transformnone">
                | <span class="italic">generated automatically</span>
              </span>
          </label>
          <div class="deadline small">
            {{disputedPrice}}<span class="ctf">ctf</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
          <span class="disclaimer">
            * 10% dispute escrow will be returned unless there was a dispute and you lost.
            It is NOT fee for our services.
          </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <b-form-checkbox v-model="form.published"
                         name="published"
                         :value="true"
                         :unchecked-value="false">
          Published
        </b-form-checkbox>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <task-attachment-uploader @attach="attach" :attachments="form.Attachments"/>
      </div>
    </div>
    <div class="row submitrow">
      <div class="col-md-12 text-center">
        <button class="btn btn-primary" type="submit" :disabled="sending">Submit job</button>
      </div>
    </div>
  </b-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import TaskAttachmentUploader from './TaskAttachmentUploader.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskForm',
  components: { TaskAttachmentUploader },
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        title: null,
        description: null,
        price: null,
        worktime: null,
        published: false,
        Attachments: [],
      },
      sending: false,
    };
  },
  watch: {
    task(nv) {
      if (nv) {
        this.form = Object.assign({}, this.form, this.task);
      }
    },
  },
  validations: {
    form: {
      title: {
        required,
      },
      description: {
        required,
      },
      price: {
        required,
      },
      worktime: {
        required,
      },
    },
  },
  computed: {
    disputedPrice() {
      if (this.form.price !== undefined) {
        return Math.round(this.form.price / 100 * 10);
      }

      return '';
    },
  },
  methods: {
    /**
     * Persist task data
     */
    async saveTask() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;

        try {
          if (!this.task) {
            await this.$store.dispatch('tasks/create', this.form);
            this.form = {};
          } else {
            await this.$store.dispatch('tasks/update', {
              id: this.task.id,
              data: this.form,
            });
          }
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: 'Task saved successfully',
          });
          if (!this.task) {
            this.$router.push('/');
          }
        } catch (err) {
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: `Task save failed. ${err.response.data.message}`,
          });
        }
      }
    },

    /**
     * Attach files to form
     * @param files
     */
    attach(files) {
      this.form.Attachments = files;
    },
  },
};
</script>
