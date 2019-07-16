<template>
<div>
<ejs-schedule height='100vh'
 :selectedDate="selectedDate"
:currentView='currentView'
:eventSettings='eventSettings'
:eventRendered="oneventRendered"
:workDays="[0]"
></ejs-schedule>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SchedulePlugin, Day, WorkWeek, Agenda, Month, Week } from '@syncfusion/ej2-vue-schedule';
import  EventSettings  from '@/models/EventSettings';

import Axios from "axios";

@Component({
  components: {
  },
data () {
      return {
        selectedDate: new Date(),
        }
      },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  }
})
export default class SyncfusionCalendarContainer extends Vue {
    currentView:string = 'Month';
    eventSettings:EventSettings=<EventSettings>{
      dataSource: []
    };
  async mounted() {
    const response = await Axios.get("http://demo1807516.mockable.io/appointments"); //http://localhost:3000/DetailEvents
    console.log(response);
    const appontments = response.data.DetailEvents;
    appontments.map((appointment: any) => {
      const startDate = new Date(
        parseInt(appointment["StartDateTime"].replace(/\D+/g, "")) / 10000
      );
      const endDate = new Date(
        parseInt(appointment["EndDateTime"].replace(/\D+/g, "")) / 10000
      );
          const eventDetails = {
            'Id': appointment.OccurenceID,
            'Subject': appointment.EventSubject,
            'StartTime': startDate,
            'EndTime': endDate
    }
    this.eventSettings.dataSource.push(
      eventDetails
    );
    });
  }
  oneventRendered(arg:any){
    arg.element.innerHTML =` <img src="#"/>
    <br><b>custamized view for ${arg.data.Subject}
    </b>`;
    arg.element.style.backgroundColor = 'didgerblue';
    arg.element.style.height = '150px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../node_modules/@syncfusion/ej2-base/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/fabric.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/fabric.css';
</style>
