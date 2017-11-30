<template>
    <div id='app'>
        <v-app>
            <v-navigation-drawer app v-model="drawer"
                                 clipped fixed mini>
                <v-list dense>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Home</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon>contact_mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Contact</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Settings</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app color="brown" dark fixed clipped-left>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>ELF CRM</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <v-footer app color="brown" fixed>
                <span>&copy; 2017</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

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
    }
});
</script>
<style>
    .greeting {
        font-size: 20px;
    }
</style>

