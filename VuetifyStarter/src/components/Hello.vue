<!-- src/components/Hello.vue -->
<template>
    <div>
        <div class="greeting">Hello decorator {{name}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class HelloComponent extends Vue {
        @Prop() initialEnthusiasm: number;

        enthusiasm: number = this.initialEnthusiasm;
        users: IUser[] = [];

        // computed
        get exclamationMarks() {
            return Array(this.enthusiasm + 1).join('!');
        };

        // methods
        increment(): void {
            this.enthusiasm++;
        };

        decrement(): void {
            if (this.enthusiasm > 1) 
                this.enthusiasm++;
        };

        created() {
            console.log("created");
        }
        mounted() {
            console.log('mounted');
        };
    }
</script>

<style>
    .greeting {
        font-size: 20px;
    }
</style>
