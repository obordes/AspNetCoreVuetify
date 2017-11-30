import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
//import HelloDecoratorComponent from "./components/HelloDecorator.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="2" />        
    </div>
    `,
    data: {
        name: "Everybody"
    },
    components: {
        HelloComponent,
        //HelloDecoratorComponent
    }

});