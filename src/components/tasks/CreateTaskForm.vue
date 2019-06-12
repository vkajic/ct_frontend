<template>
  <b-form @submit.prevent="createTask">
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
    <div class="row submitrow">
      <div class="col-md-12 text-center">
        <button class="btn btn-primary" type="submit" :disabled="sending">Submit job</button>
      </div>
    </div>
  </b-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'CreateTaskForm',
  data() {
    return {
      form: {
        title: null,
        description: null,
        price: null,
        worktime: null,
      },
      sending: false,
    };
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
    async createTask() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;

        try {
          await this.$store.dispatch('task/create', this.form);
          this.form = {};
          this.$v.$reset();
          this.sending = false;
          this.$store.commit('ui/showNotification', {
            type: 'success',
            text: 'Task created successfully',
          });
        } catch (err) {
          this.sending = false;
          this.$store.commit('ui/showNotification', {
            type: 'danger',
            text: `Task creation failed. ${err.response.data.message}`,
          });
        }
      }
    },
  },
};
</script>
