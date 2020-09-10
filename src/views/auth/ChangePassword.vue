<template>
  <div class="row">
    <div class="col-12 col-lg-7">
      <paper>
        <h1 class="mb-5 text-center text-lg-left">{{$t('auth.change_password.title')}}</h1>

        <b-form @submit.prevent="changePassword">
          <b-form-group>
            <b-form-input
              v-model="form.oldPassword"
              type="password"
              size="lg"
              :placeholder="$t('auth.change_password.old')"
              :state="$v.form.oldPassword.$dirty ? !$v.form.oldPassword.$error : null"/>
            <validation-messages title="Old password" :validation="$v.form.oldPassword"/>
          </b-form-group>

          <b-form-group>
            <b-form-input
              v-model="form.newPassword"
              type="password"
              size="lg"
              :placeholder="$t('auth.change_password.new')"
              :state="$v.form.newPassword.$dirty ? !$v.form.newPassword.$error : null"/>
            <validation-messages title="New password" :validation="$v.form.newPassword"/>
          </b-form-group>

          <b-form-group>
            <b-form-input
              v-model="form.newPasswordConfirmation"
              type="password"
              size="lg"
              :placeholder="$t('auth.change_password.new_again')"
              :state="$v.form.newPasswordConfirmation.$dirty
            ? !$v.form.newPasswordConfirmation.$error
            : null"/>
            <validation-messages title="New password confirmation"
                                 :validation="$v.form.newPasswordConfirmation"/>
          </b-form-group>

          <b-button type="submit" variant="primary" size="lg" block v-if="!sending">
            {{$t('auth.change_password.button_label')}}
          </b-button>
          <b-button type="submit"
                    variant="primary"
                    size="lg"
                    block
                    :disabled="true"
                    v-if="sending">
            {{$t('auth.change_password.button_loading')}}
          </b-button>
        </b-form>
      </paper>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import ApiService from '../../services/api.service';
import ValidationMessages from '../../components/form/ValidationMessages.vue';
import Paper from '../../components/ui/Paper.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'ChangePassword',
  components: {
    Paper,
    ValidationMessages,
  },
  data() {
    return {
      form: {
        oldPassword: null,
        newPassword: null,
        newPasswordConfirmation: null,
      },
      sending: false,
      error: null,
    };
  },
  validations: {
    form: {
      oldPassword: {
        required,
        minLength: minLength(8),
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
      newPasswordConfirmation: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs('newPassword'),
      },
    },
  },
  methods: {
    async changePassword() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;
        this.error = null;

        try {
          this.$smartContract.createKeypairs({email: this.$store.state.user.user.email, password: this.form.newPassword});
          const keypairs = this.$smartContract.getKeypairs();
          this.form.newPublicKey = keypairs.keypairFormatted.publicKey;

          await ApiService.put('/users/password', this.form);
          this.$v.$reset();
          this.sending = false;
          this.$store.dispatch('ui/showNotification', {
            type: 'success',
            text: this.$t('auth.change_password.saved'),
          });
        } catch (err) {
          this.$store.dispatch('ui/showNotification', {
            type: 'danger',
            text: err.response.data.message,
          });

          this.sending = false;
          this.error = err.response.data.message;
        }
      }
    },
  },
};
</script>
