<template>
  <ul class="auth-role-selector list-unstyled list-inline">
    <li class="list-inline-item mr-4">
      <a href="#" :class="{'active': selected === 'freelancer'}"
         @click="select($event, 'freelancer')">
        Freelancer
      </a>
    </li>
    <li class="list-inline-item">
      <a href="#" :class="{'active': selected === 'client'}"
         @click="select($event, 'client')">
        Client
      </a>
    </li>
  </ul>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'AuthRoleSelector',
  props: {
    selected: {
      type: String,
      default: 'freelancer',
    },
  },
  methods: {
    select(e, role) {
      e.preventDefault();
      this.$emit('select', role);
    },
  },
};
</script>
