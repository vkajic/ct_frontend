<template>
  <funnel-container>
    <div class="row">
      <div class="col-12">
        <skills-form/>
      </div>
    </div>
  </funnel-container>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
import FunnelContainer from '../../components/profile/FunnelContainer.vue';
import SkillsForm from '../../components/profile/SkillsForm.vue';

export default {
  name: 'Skills',
  components: { SkillsForm, FunnelContainer },
};
</script>
