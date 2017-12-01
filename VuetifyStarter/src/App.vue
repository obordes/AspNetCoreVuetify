<template>
    <div id='app'>
        <v-app>
            <v-toolbar app color="brown" fixed dark
                       clipped-left
                       >
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>ELF CRM</v-toolbar-title>
            </v-toolbar>
            <!--<nav-drawer></nav-drawer>-->
            <v-navigation-drawer app v-model="drawer"
                                 clipped fixed mini>
                <v-list dense>
                    <v-list-tile @click="" to="/">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Home</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="" to="/Contacts">
                        <v-list-tile-action>
                            <v-icon>contact_mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Contact</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="" to="/Settings">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Settings</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>

            <transition name="test" mode="out-in">
                <v-content>
                    <v-container fluid>
                        <v-layout row>
                            <router-view></router-view>
                        </v-layout>
                    </v-container>
                </v-content>
            </transition>            

            <v-footer app color="brown" fixed>
                <span>&copy; 2017</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import NavDrawer from './components/layout/NavDrawer'

export default Vue.extend({
    //props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            drawer: null,
            source: '',
        }
    },
    methods: {
        doSomething(): void {
            window.alert('coucou');
        }
    },
    computed: {
        //exclamationMarks(): string {
        //    return Array(this.enthusiasm + 1).join('!');
        //}
    },
    components: {
        NavDrawer
    }
});
</script>
<style>
    .greeting {
        font-size: 20px;
    }
</style>

