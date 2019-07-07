<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <back-button/>
      </div>
      <div class="col-md-8 center">
        <h1>My Profile</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block">
          <profile-picture-form :picture="avatar" class="mb-3" @change="updateAvatar"/>
          <profile-form :profile="profile" @save="save"/>
          <hr>
          <profile-password-form @save="changePassword"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import ProfileForm from '../components/profile/ProfileForm.vue';
import ProfilePictureForm from '../components/profile/ProfilePictureForm.vue';
import ProfilePasswordForm from '../components/profile/ProfilePasswordForm.vue';
import UserService from '../services/user.service';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Profile',
  components: {
    ProfilePasswordForm,
    ProfilePictureForm,
    ProfileForm,
    BackButton,
  },
  computed: {
    profile() {
      return this.$store.state.user.user;
    },
    avatar() {
      return this.profile ? this.profile.picture : null;
    },
  },
  methods: {
    /**
     * Update user profile
     * @param {Object} data
     */
    async save(data) {
      try {
        this.$store.commit('ui/toggleLoader');
        await this.$store.dispatch('user/updateMe', data);
        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Profile saved successfully',
        });
        this.$store.commit('ui/toggleLoader');
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: `Profile save failed. ${err.response.data.message}`,
        });
        this.$store.commit('ui/toggleLoader');
      }
    },

    /**
     * Update avatar
     * @param {String} avatar
     */
    updateAvatar(avatar) {
      const profile = Object.assign({}, this.profile, {
        picture: avatar,
      });

      this.save(profile);
    },

    /**
     * Change user password
     * @param {Object} data
     * @return {Promise<void>}
     */
    async changePassword(data) {
      try {
        this.$store.commit('ui/toggleLoader');
        await UserService.updatePassword(data);
        this.$store.dispatch('ui/showNotification', {
          type: 'success',
          text: 'Password changed successfully',
        });
        this.$store.commit('ui/toggleLoader');
      } catch (err) {
        this.$store.dispatch('ui/showNotification', {
          type: 'danger',
          text: `Password save failed. ${err.response.data.message}`,
        });
        this.$store.commit('ui/toggleLoader');
      }
    },
  },
};
</script>
