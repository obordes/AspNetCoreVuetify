<template>
    <v-container>
        <v-alert class="error" icon="warning" :value="alertVisible" transition="scale-transition">{{error}}</v-alert> 
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
                                <v-text-field label="Password" v-model="password" required min="6" :rules="passwordRules" :counter="20"
                                              :append-icon="pwdHidden ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (pwdHidden = !pwdHidden)"
                                              :type="pwdHidden ? 'password' : 'text'"></v-text-field>
                                <v-btn @click="submit" :disabled="!valid">Login</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>  
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { mapActions, mapGetters } from 'vuex';
    import { LoginCredentials } from '../../store/store';

    export default Vue.extend({
        data() {
            return {
                valid: false,
                alertVisible: false,
                pwdHidden: true,
                email: '',
                emailRules: [
                    (v: string) => !!v || 'E-mail is required',
                    (v: string) => v.length <= 50 || 'Max 50 characters',
                    (v: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail is not valid'
                ],
                password: '',
                passwordRules: [
                    (v: string) => !!v || 'Password is required',
                    (v: string) => v.length >= 6 || 'At least 6 characters',
                    (v: string) => v.length <= 20 || 'Max 20 characters'
                ],
            }
        },
        watch: {
            'isAuthenticated': function (v: any): void {
                if (v) {
                    this.$router.push({ path: '/' })
                }
            },
            'error': function (v) {
                if (v) this.alertVisible = true;
            }
        },

        computed: {
            ...mapGetters([
                'isAuthenticated'
            ]),
            error(): string | null {
                return this.$store.state.error;
            }
        },

        methods: {
            ...mapActions([
                'login'
            ]),

            submit() {
                const credentials: LoginCredentials = { Email: this.email, Password: this.password };
                this.$store.dispatch('login',credentials);
            }
        }
    });
</script>
