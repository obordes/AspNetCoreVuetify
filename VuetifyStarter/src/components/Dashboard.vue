<!-- src/components/Dashboard.vue -->
<template>
    <div>
        <h1></h1>
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

        mounted() {
            this.$store.dispatch('setTitle', 'Home');
        };
    }
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
