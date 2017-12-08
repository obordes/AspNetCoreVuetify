<!-- src/components/Accounts/ManageAccount.vue -->
<template>
    <div>
        <h1>{{title}}</h1>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ManageAccountComponent extends Vue {
        //@Prop() name: string;
        title: string = "Manage account";

        doSomething(): void {
            window.alert('coucou');
        }
    }
</script>

<style>
</style>
