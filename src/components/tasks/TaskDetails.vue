<template>
  <div class="task-details">
    <h5 class="mb-4">Project details</h5>

    <b-button variant="primary" block class="btn-round mb-4">
      Apply for job
    </b-button>

    <div>
      <div class="detail d-flex align-items-center">
        <check-square-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            POSTED
          </div>
          <strong>Posted on May 24, 2019</strong>
        </div>
      </div>

      <div class="detail d-flex align-items-center">
        <plus-square-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            STATUS
          </div>
          <strong>Accepting applications</strong>
        </div>
      </div>

      <div class="detail d-flex align-items-center">
        <calendar-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            DURATION
          </div>
          <strong>3 - 6 months</strong>
        </div>
      </div>

      <div class="detail d-flex align-items-center">
        <credit-card-icon size="20" class="mr-3"/>
        <div>
          <div class="small-heading">
            PAYMENT
          </div>
          <strong>20 ETH (~ $4.000 USD)</strong>
        </div>
      </div>
    </div>

    <div class="share">
      <a href="#" class="d-flex align-items-center text-secondary">
        <share-2-icon size="20" class="mr-3"/>
        Share
      </a>
    </div>
  </div>
</template>

<script>
import {
  CheckSquareIcon, PlusSquareIcon, CalendarIcon, CreditCardIcon, Share2Icon,
} from 'vue-feather-icons';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskDetails',
  components: {
    CheckSquareIcon,
    PlusSquareIcon,
    CalendarIcon,
    CreditCardIcon,
    Share2Icon,
  },
};
</script>
