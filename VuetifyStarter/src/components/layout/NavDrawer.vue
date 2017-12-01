<!-- src/components/NavDrawer.vue -->
<template>
    <div>
        <h1>{{title}}</h1>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class NavDrawerComponent extends Vue {
        //@Prop() name: string;
        title: string = "Settings";

        doSomething(): void {
            window.alert('coucou');
        }
    }
</script>

<style>
</style>
