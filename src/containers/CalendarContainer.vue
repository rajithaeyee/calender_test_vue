<template>
  <FullCalendar defaultView="dayGridMonth"
   :plugins="calendarPlugins" 
   :selectable="true"
   :events="events"
    @select="dateSelected"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import Axios from 'axios';

@Component({
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin]
    };
  }
})
export default class CalendarContainer extends Vue {
events: any[] =[
   { title: 'event 1', start: new Date('2019-04-01'),end: new Date('2019-04-02'), startStr:'2019-04-01', endStr:'2019-04-02' },
   { title: 'event 2', date: '2019-04-02' }
];

async mounted(){
   const response =  await Axios.get('http://localhost:3000/DetailEvents');
   const appontments = response.data;
    appontments.map((appointment:any)=>{
        const startDate = new Date(parseInt(appointment['StartDateTime'].replace(/\D+/g, ''))/10000);
        const endDate = new Date(parseInt(appointment['EndDateTime'].replace(/\D+/g, ''))/10000);
        this.events.push({
          'title': appointment.EventSubject,
          'startStr': `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`,
          'endStr': `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`,
          'start': startDate,
          'end': endDate,
        })
    });
}

dateSelected(event:any){
  console.log(event);
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>
