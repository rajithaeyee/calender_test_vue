<template>
  <div class="home">
   <SyncfusionCalendarContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SyncfusionCalendarContainer from '@/containers/SyncfusionCalendarContainer.vue';

@Component({
  components: {
    SyncfusionCalendarContainer,
  },
})
export default class SyncfusionCalendar extends Vue {}
</script>
