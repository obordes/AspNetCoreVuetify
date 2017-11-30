// One extra thing we'll have to do is tell TypeScript what .vue files will look like when they're imported. 
// We don't need to import this file anywhere. It's automatically included by TypeScript, 
// and it tells that anything imported that ends in .vue has the same shape of the Vue constructor itself.

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Sans ce fichier, toute ligne du genre import HelloComponent from "./components/Hello.vue"
// provoque une erreur : Cannot find module './components/Hello.vue'.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}