<template>
    <div>
        <kendo-scheduler :data-source="dataset"
                         :date="new Date()"
                         :height="900"
                         :timezone="'Etc/UTC'"
                         @change="onChange"
                         @edit="onEdit"
                         @add="onAdd"
                         @cancel="onCancel"
                         @dataBound="onDataBound"
                         @move="onMove"
                         @navigate="onNavigate"
                         @resize="onResize"
                         @save="onSave">
            <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
            <kendo-scheduler-view :type="'workWeek'" :selected="true"></kendo-scheduler-view>
            <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>
            <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
            <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view>
        </kendo-scheduler>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class KendoSchedulerContainer extends Vue {
        @Prop()
        dataset!: any[];

        date = new Date();

        onChange (ev: any) {
            console.log("Event :: change");
        }
        onEdit(ev: any) {
            console.log("Event :: edit");
        }
        onAdd (ev: any) {
            console.log("Event :: add");
        }
        onCancel (ev: any) {
            console.log("Event :: cancel");
        }
        onDataBound (ev: any) {
            console.log("Event :: dataBound");
        }
        onMove (ev: any) {
            console.log("Event :: move");
        }
        onNavigate (ev: any) {
            console.log("Event :: navigate");
        }
        onResize (ev: any) {
            console.log("Event :: resize");
        }
        onSave(ev: any) {
            console.log("Event :: save");
        }
    }
</script>

<style scoped>

</style>
