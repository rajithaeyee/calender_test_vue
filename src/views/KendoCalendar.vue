<template>
  <div class="home">
   <FullCalendarContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FullCalendarContainer from '@/containers/FullCalendarContainer.vue';

@Component({
  components: {
    FullCalendarContainer,
  },
})
export default class KendoCalendar extends Vue {}
</script>
