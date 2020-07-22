<template>
  <div class="required-skills">
    <div class="small-heading mb-4">{{$t('tasks.details.required_skills')}}</div>

    <ul class="list-unstyled">
      <li v-for="(skill, index) in skills" :key="index"><span>{{skill.name}}</span></li>
    </ul>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'RequiredSkills',
  props: {
    skills: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
