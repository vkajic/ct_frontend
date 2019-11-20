<template>
  <div>
    <chat-history-header :term="term" @search="search" />
    <hr class="mt-2">
    <chat-history-item v-for="(user,i) in Users"
                      :key="i + 'chat history item'"
                      :user="user"
                      @click.native="openMessages(user)"/>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import ChatHistoryHeader from './ChatHistoryHeader.vue';
import ChatHistoryItem from './ChatHistoryItem.vue';

export default {
  name: 'ChatHistory',
  components: {
    ChatHistoryHeader,
    ChatHistoryItem,
  },
  data() {
    return {
      term: null,
      users: [
        {
          avatar: null,
          fullName: 'ivan horvat',
          lastMsg: {
            from: 'ivan',
            time: Date.now(),
            text: 'bla bkasj hjsd jshjhjhjhjhs sj hjshdj s',
          },
        },
        {
          avatar: null,
          fullName: 'martina zgela',
          lastMsg: {
            from: 'you',
            time: Date.now(),
            text: 'bla bkasj',
          },
        },
      ],
    };
  },
  props: {

  },
  computed: {
    Users() {
      return !this.term ? this.users : this.filterUsers();
    },
  },
  methods: {
    search(term) {
      this.term = term;
    },
    filterUsers() {
      console.log('filtering by full name');
      return this.users.filter(user => user.fullName.includes(this.term));
    },
    openMessages(user) {
      console.log('open chat with ', user.fullName);
    },
  },
  created() {
  },
};
</script>
