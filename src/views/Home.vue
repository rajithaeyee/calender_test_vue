<template>
  <div class="home">
   <CalendarContainer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CalendarContainer from '@/containers/CalendarContainer.vue';

@Component({
  components: {
    CalendarContainer,
  },
})
export default class Home extends Vue {}
</script>
