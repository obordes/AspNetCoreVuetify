<!-- src/components/Contacts.vue -->
<template>
    <div>
        <h1>{{title}}</h1>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ContactsComponent extends Vue {
        //@Prop() name: string;
        title: string = "Contacts";

        doSomething(): void {
                window.alert('coucou');
        }

        get hello(): string {
            return 'Bienvenue sur ELF';
        }
    }
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
