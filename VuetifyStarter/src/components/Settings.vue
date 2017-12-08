<!-- src/components/Settings.vue -->
<template>
    <div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class SettingsComponent extends Vue {

        mounted() {
            this.$store.dispatch('setTitle', 'Settings');
        };
    }
</script>

<style>
</style>
