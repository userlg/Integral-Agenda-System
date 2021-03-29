<script>
import Vue from "vue";
import axios from "axios";
import { mapActions } from "vuex";
import Full from "Container/Full";
import SchedulerComponent from "../../components/SystemComponents/Scheduler/SchedulerComponent";

export default Vue.extend({
  name: "Scheduler",
  components: {
    SchedulerComponent,
  },

  data() {
    return {
      events: [
        { id:1, start_date:"2020-01-20 6:00", end_date:"2020-01-20 15:00", text:"Event 1"},
        { id:2, start_date:"2020-01-23 6:00", end_date:"2020-01-23 20:00", text:"Event 2"}
      ]
    };
  },
  computed: {
    create: {
      get() {
        return this.$store.state.permit.create;
      },
    },
    read: {
      get() {
        return this.$store.state.permit.read;
      },
    },
    update: {
      get() {
        return this.$store.state.permit.update;
      },
    },
    deletePermit: {
      get() {
        return this.$store.state.permit.deletePermit;
      },
    },
  },
  async beforeMount() {
    await this.getPermitByRoleModule(9);
  },
  methods: {
		...mapActions({getPermitByRoleModule: 'permit/getPermitByRoleModule'}),
  },
});
</script>
<template>
  <div class="pb-0">
    <v-container fluid class="px-3">
      <app-card>
        <!-- <div class="row mx-0">
          <page-title-bar />
          <v-spacer />
        </div> -->
    <SchedulerComponent class="left-container" :events="events" />
  </app-card>
    </v-container>
  </div></template>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
 
  .container {
    height: 100%;
    width: 100%;
  }
 
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100vh;
  }
 
</style>