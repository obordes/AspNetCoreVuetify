import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
//import HelloDecoratorComponent from "./components/HelloDecorator.vue";
var v = new Vue({
    el: "#app",
    template: "\n    <div>\n        Name: <input v-model=\"name\" type=\"text\">\n        <hello-component :name=\"name\" :initialEnthusiasm=\"5\" />        \n    </div>\n    ",
    data: {
        name: "World"
    },
    components: {
        HelloComponent: HelloComponent,
    }
});
//# sourceMappingURL=index.js.map