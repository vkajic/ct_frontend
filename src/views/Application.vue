<template>
  <div class="container task">
    <div class="row">
      <div class="col-md-2">
        <back-button/>
      </div>
      <div class="col-md-8 center">
        <h1>Task Application</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="block">
          <div class="upper">
            <div class="row">
              <div class="col-8">
                <chat-container :application="application" :task="task"/>
              </div>
              <div class="col-4">
                <h2>{{task.title}}</h2>
                <p>{{task.description}}</p>

                <div class="deadline">
                  {{task.price}}<span class="ctf">ctf</span>
                </div>

                <div class="secondary">
                  <label>Worktime</label>
                  {{task.worktime}} day(s)
                </div>
                <div class="secondary">
                  <label>Worktime left</label>
                  <div class="deadline">
                    <remaining-days :item="task"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BackButton from '../components/BackButton.vue';
import ChatContainer from '../components/tasks/chat/ChatContainer.vue';
import RemainingDays from '../components/tasks/RemainingDays.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Application',
  components: {
    RemainingDays,
    ChatContainer,
    BackButton,
  },
  computed: {
    ...mapState('tasks', {
      application: state => state.selectedApplication,
    }),
    task() {
      return this.application.Task || {};
    },
  },
  created() {
    const id = parseInt(this.$route.params.id, 10);

    // get application data
    this.$store.dispatch('tasks/getApplication', id);

    // set messages as read for this application
    this.$store.dispatch('chat/readMessages', id)
      .then(() => {
        // subscribe to chat
        this.$socket.emit('subscribe', id);
      });
  },
  destroyed() {
    const { id } = this.$route.params;

    // deselect application
    this.$store.commit('tasks/setSelectedApplication', {});

    this.$socket.emit('unsubscribe', id);
  },
};
</script>
