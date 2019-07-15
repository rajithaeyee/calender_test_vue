<template>
  <FullCalendar
    defaultView="timelineMonth"
    :plugins="calendarPlugins"
    :selectable="true"
    :events="events"
    :hiddenDays="[0,1,2,4,5,6]"
    :validRange="validRange"
    ref="fullCalendar"
    @select="dateSelected"
    @eventRender="eventRendered"
    
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import Axios from "axios";

@Component({
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [timelinePlugin, interactionPlugin]
    };
  }
})
export default class FullCalendarContainer extends Vue {
  //defaultView=dayGridMonth
  events: any[] = [
    {
      title: "event 1",
      start: new Date("2019-04-01"),
      end: new Date("2019-04-02"),
      startStr: "2019-04-01",
      endStr: "2019-04-02"
    },
    { title: "event 2", date: "2019-04-02" }
  ];
validRange:any= {
    start: '2019-01-01',
    end: '2019-08-01'
  }
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
      this.events.push({
        title: appointment.EventSubject,
        startStr: `${startDate.getFullYear()}-${startDate.getMonth() +
          1}-${startDate.getDate()}`,
        endStr: `${endDate.getFullYear()}-${endDate.getMonth() +
          1}-${endDate.getDate()}`,
        start: startDate,
        end: endDate
      });
    });
  }

  dateSelected(event: any) {
    console.log(event);
  }

  eventRendered(info: any) {
    console.log(info);
    info.el.innerHTML = `<b>hello ${info.event.title} at ${this.formatAMPM(
      info.event.start
    )}</b>`;
    info.el.style.backgroundColor = "#3ce49e";
    info.el.style.borderColor = "#3ce49e";
  }

  formatAMPM(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minute = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minute + " " + ampm;
    return strTime;
  }

  viewRendered(view: any, el:any){
    debugger;
    console.log(view);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timeline/main.css"
</style>
