<template>
    <div id='app'>
        <v-app>
            <v-toolbar app color="brown" clipped-left fixed dense dark>
                <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
                <v-toolbar-title>ELF CRM</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- User management inside a right-side menu -->
                <!--<v-menu bottom down left>
                    <v-btn icon slot="activator" dark>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile avatar tag="div">
                            <v-list-tile-avatar>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{userName}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="" to="/Contacts">
                            <v-list-tile-action>
                                <v-icon>mode_edit</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Manage</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="logout">
                            <v-list-tile-action>
                                <v-icon>power_settings_new</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Logout</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>-->
            </v-toolbar>
            <v-navigation-drawer app 
                                 v-model="expanded"
                                 clipped fixed width="200">
                <!-- User management menu when hovering on the avatar -->
                <v-menu v-if="isAuthenticated" open-on-hover close-on-click offset-y left full-width>
                    <v-list dense slot="activator">
                        <v-list-tile avatar @click="">
                            <v-list-tile-avatar>
                                <v-icon>face</v-icon>
                                <!--<img src="https://randomuser.me/api/portraits/men/85.jpg" />-->
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Hello {{userName}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                    </v-list>
                    <!-- User management menu items -->
                    <v-list dense>
                        <v-list-tile @click="" to="/Account">
                            <v-list-tile-action>
                                <v-icon>mode_edit</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Manage account</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="logout">
                            <v-list-tile-action>
                                <v-icon>power_settings_new</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Logout</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <!-- Main feature menu -->
                <v-list v-if="isAuthenticated" dense>
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
                            <v-list-tile-title>Contacts</v-list-tile-title>
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
                <!-- Login menu -->
                <v-list v-if="!isAuthenticated" dense>
                    <v-list-tile @click="" to="/Login">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Login</v-list-tile-title>
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
    import { Vue, Component, Prop } from "vue-property-decorator";
    //import NavDrawer from './components/layout/NavDrawer'
    import { mapActions, mapState } from 'vuex';

    export default Vue.extend({
        //props: ['name', 'initialEnthusiasm'],
        data() {
            return {
            }
        },

        methods: {
            ...mapActions([
                'toggleDrawer',
                //'logout',
                'setDrawer'
            ]),
            logout() {
                this.$store.dispatch('logout');
                this.$router.push({ path: '/Login' })
            }
        },
        computed: {
            userName(): string | null {
                return this.$store.getters.userName;
            },
            isAuthenticated(): boolean {
                return this.$store.getters.isAuthenticated;
            },
            expanded: {
                get: function (): boolean {
                    return this.$store.state.DrawerExpanded;
                },
                set: function (value: boolean): void {
                    this.$store.dispatch('setDrawer', value);
                    //this.setDrawer(value);
                }
            }
        },
        components: {
            //NavDrawer
        }
    });
</script>
<style>
    .greeting {
        font-size: 20px;
    }
</style>

