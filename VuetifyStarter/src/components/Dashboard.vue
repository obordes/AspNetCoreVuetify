<!-- src/components/Dashboard.vue -->
<template>
    <div>
        <h1>{{myVariable}} {{hello}}</h1>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class DashboardComponent extends Vue {
        //@Prop() name: string;
        myVariable: string = "This is the ";

        doSomething(): void {
            window.alert('coucou');
        }

        get hello(): string {
            return 'ELF dashboard';
        }
    }
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
