<template>
  <div class="row" v-if="item.stage === 1">
    <div class="col-md-12">
      <form>
        <div class="form-group">
          <label>Solution description</label>
          <textarea class="form-control" v-model="formData.solution"></textarea>
        </div>
        <div v-if="formResponse.notice" class="alert alert-danger" role="alert">
          {{formResponse.notice}}
        </div>
        <a class="btn btn-blue" @click="submitSolution">Submit solution</a>
      </form>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskSubmitSolutionForm',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
      formResponse: {},
    };
  },
  methods: {
    submitSolution() {
      //
    },
  },
};
</script>
