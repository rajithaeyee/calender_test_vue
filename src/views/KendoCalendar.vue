<template>
    <div class="home">
        <div class="btn-group">
        <kendo-button class="k-primary" @click="resetData()">Reset Data</kendo-button>
        &nbsp;
        <kendo-button class="k-primary" @click="loadData()">Load Data</kendo-button>
        </div>
        <KendoSchedulerContainer :dataset="dataset"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Axios from "axios";
    import KendoSchedulerContainer from '@/containers/KendoSchedulerContainer.vue';
    import '@progress/kendo-ui/js/kendo.scheduler'
    import '@progress/kendo-ui/js/kendo.button'
    import '@/assets/kendo/all.css'
    import '@/assets/kendo/variables.scss'
    import {SchedulerInstaller} from '@progress/kendo-scheduler-vue-wrapper'
    import { ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'

    Vue.use(SchedulerInstaller);
    Vue.use(ButtonsInstaller);

    @Component({
        components: {
            KendoSchedulerContainer,
        },
    })
    export default class KendoCalendar extends Vue {
        dataset: any[] = [];

        transformDate(dateString: string) {
            const date = new Date(parseInt(dateString.replace("/Date(", "").replace(")/", "")));
            return date;
        }

        resetData(){
            this.dataset = [];
        }

        async loadData(){
            this.dataset = [];
            const response = await Axios.get("http://localhost:9001/appointments");
            console.log(response);
            response.data.DetailEvents.forEach((item: any) => {
                this.dataset.push({
                    id: item.PK_EventID,
                    start: this.transformDate(item.StartDateTime),
                    end: this.transformDate(item.EndDateTime),
                    title: item.EventSubject,
                    description: item.EventStatusDescription
                });
            });
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');

    .home, .k-window, .k-popup {
        font-family: 'Titillium Web', sans-serif;
    }

    .btn-group {
        margin-bottom: 10px;
    }
</style>
