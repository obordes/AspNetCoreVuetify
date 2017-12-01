<!-- src/components/Dashboard.vue -->
<template>
    <div>
        <h1>This is the dashboard {{myVariable}}</h1>
        <p>{{hello}}:</p>
        <ul>
            <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
            <li><strong>Webpack dev middleware</strong>. In development mode, there's no need to run the <code>webpack</code> build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.</li>
            <li><strong>Hot module replacement</strong>. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, your Vue app will be rebuilt and a new instance injected is into the page.</li>
            <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and the <code>webpack</code> build tool produces minified static CSS and JavaScript files.</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class DashboardComponent extends Vue {
        //@Prop() name: string;
        myVariable: string = "I'm a variable";

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
