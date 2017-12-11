<template>
    <v-form v-model="valid">
        <v-card>
            <v-card-title>
                <span class="headline">Login to ELF CRM</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Email" v-model="email" required :rules="emailRules"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Password" v-model="password" required min="6" :rules="passwordRules"
                                          :append-icon="pwdHidden ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (pwdHidden = !pwdHidden)"
                                          :type="pwdHidden ? 'password' : 'text'"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-alert color="error" icon="warning" dismissible v-model="alertVisible" transition="scale-transition">{{errorMessage}}</v-alert>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" :loading="submitting" :disabled="!valid" color="primary">
                    Login
                    <!--<span slot="loader">Please wait...</span>-->
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<XXXtemplate>
    <v-container>
        <v-card color="grey lighten-4" flat>
            <v-card-text>
                <v-form v-model="valid">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field label="Email" v-model="email" required :rules="emailRules" :counter="50"></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field label="Password" v-model="password" required min="6" :rules="passwordRules"
                                              :append-icon="pwdHidden ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (pwdHidden = !pwdHidden)"
                                              :type="pwdHidden ? 'password' : 'text'"></v-text-field>
                                <v-btn @click="submit" :loading="submitting" :disabled="!valid">
                                    Login
                                    <!--<span slot="loader">Please wait...</span>-->
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <v-alert color="error" icon="warning" dismissible v-model="alertVisible" transition="scale-transition">{{errorMessage}}</v-alert>
                    </v-container>
                </v-form>  
            </v-card-text>
        </v-card>
    </v-container>
</XXXtemplate>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { mapActions, mapGetters } from 'vuex';
    import { HTTP } from '../../helpers/http';
    import * as JwtConstants from '../../JwtConstants';

    export default Vue.extend({
        data() {
            return {
                submitting: false,
                valid: false,
                alertVisible: false,
                pwdHidden: true,
                email: '',
                emailRules: [
                    (v: string) => !!v || 'E-mail is required',
                    (v: string) => v.length <= 50 || 'Max 50 characters',
                    (v: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v) || 'E-mail is not valid'
                ],
                password: '',
                passwordRules: [
                    (v: string) => !!v || 'Password is required',
                    (v: string) => v.length >= 6 || 'At least 6 characters'
                ],
                errorMessage: ''
            }
        },
        watch: {
            'isAuthenticated': function (v: any): void {
                if (v) {
                    this.$router.push({ path: '/' })
                }
            },
        },

        computed: {
            ...mapGetters([
                'isAuthenticated'
            ]),
        },

        methods: {
            ...mapActions([
                'login'
            ]),

            async submit() {
                console.log(`login ${this.email}/${this.password}`);
                this.alertVisible = false;
                this.submitting = true;
                try {
                    const response = await HTTP.post(JwtConstants.TokenUrl, { email: this.email, password: this.password });
                    if (response && response.data) {
                        HTTP.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                        this.$store.commit('setUser', response.data.token);
                        //setTimeout(() => {
                        //    this.submitting = false;
                        //    this.$store.commit('setUser', response.data.token);
                        //}, 1000);
                    }
                } catch (e) {
                    if (e.response.status === 400)
                        this.errorMessage = e.response.data;
                    else if (e.response.status === 404)
                        this.errorMessage = "Server inaccessible.";
                    else
                        this.errorMessage = e;
                    this.submitting = false;
                    this.alertVisible = true;
                    this.$store.commit('setUser');
                }
            }
        },

        mounted: function () {
            // `this` points to the vm instance
            this.$store.dispatch('setTitle', 'Login');
        }
    });
</script>
