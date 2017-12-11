<!-- src/components/Accounts/Account.vue -->
<template>
    <v-form v-model="valid">
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap @keydown="errors.clear($event.target.name)">
                        <v-flex xs12 sm6>
                            <v-text-field label="Last name" v-model="user.lastName" required :counter="40" :rules="lastNameRules"
                                          :error="errors.has('lastName')" :error-messages="errors.get('lastName')"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="First name" v-model="user.firstName" :counter="40" hint="optional" :rules="firstNameRules"
                                          :error="errors.has('firstName')" :error-messages="errors.get('firstName')"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Email" v-model="user.email" required :counter="256" :rules="emailRules"
                                          :error="errors.has('email')" :error-messages="errors.get('email')"></v-text-field>
                        </v-flex>
                        <v-flex xs12 v-if="isNew">
                            <v-text-field label="Initial password" v-model="user.password" required min="6" :rules="passwordRules"
                                          :error="errors.has('password')" :error-messages="errors.get('password')"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-checkbox label="Member of ELF staff" v-model="user.isElfStaff" primary></v-checkbox>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-checkbox label="Administrator" v-model="user.isAdmin" XXXprimary></v-checkbox>
                        </v-flex>
                        <v-alert color="error" icon="warning" dismissible v-model="alertVisible" transition="scale-transition">{{errorMessage}}</v-alert>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="$emit('editor-closed')">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn :loading="submitting" :disabled="!valid" color="primary" @click="submit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { HTTP } from '../../helpers/http';
    import { Errors } from '../../helpers/Errors';
    import { IUser } from '../../store/User';

    @Component
    export default class AccountComponent extends Vue {
        @Prop() edited: IUser;
        user: IUser = this.edited;
        submitting: boolean = false;
        valid: boolean = false;
        alertVisible: boolean = false;
        errorMessage: string = '';
        errors: Errors = new Errors();
        lastNameRules: [(v: string) => true | string] = [
            this.required,
            (v: string) => this.maxLength(v, 40),
        ];
        firstNameRules: [(v: string) => true | string] = [
            (v: string) => this.maxLength(v, 40),
        ];
        emailRules: [(v: string) => true | string] = [
            this.required,
            (v: string) => this.maxLength(v, 256),
            (v: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v) || 'E-mail is not valid'
        ];
        passwordRules: [(v: string) => true | string] = [
            this.required,
            (v: string) => (v && v.length >= 6) || 'At least 6 characters'
        ];

        get isNew() {
            return !(this.user && this.user.id && this.user.id.length > 0);
        }
        get title() {
            return this.isNew ? 'Create a new user account' : 'Edit an existing user account';
        }

        required(v: string): true | string {
            return !!v || 'Required field.';
        }
        maxLength(v: string, len: number): true | string {
            return v && v.length <= len || `Max ${len} characters`;
        }

        async submit() {
            console.log("submit");
            this.alertVisible = false;
            this.submitting = true;

            try {
                const response = this.isNew
                    ? await HTTP.post('/api/accounts', this.user)
                    : await HTTP.put(`/api/accounts/${this.user.id}`, this.user);
                if (this.isNew)
                    this.$emit('editor-closed', 'User account created.', response.data);
                else
                    this.$emit('editor-closed', 'User account updated.');
            } catch (error) {
                if (error.response.status === 422) {
                    this.errors.record(error.response.data);
                } else {
                    this.errorMessage = error.response.data;
                    this.alertVisible = true;
                }
            } finally {
                this.submitting = false;
            }        
        }

        /*
        async submitOBS() {
            console.log("submit");
            this.alertVisible = false;
            this.submitting = true;

            if (this.isNew) {
                HTTP.post('/api/accounts', this.user)
                    .then(resp => {
                        this.$emit('editor-closed', 'User account created.', resp.data);
                    })
                    .catch(error => {
                        if (error.response.status === 422) {
                            this.errors.record(error.response.data);
                        } else {
                            this.errorMessage = error;
                            this.alertVisible = true;
                        }
                    })
                    .then(resp => {
                        this.submitting = false;
                    });
            } else {
                HTTP.put(`/api/accounts/${this.user.id}`, this.user)
                    .then(resp => {
                        this.$emit('editor-closed', 'User account updated.');
                    })
                    .catch(error => {
                        this.errorMessage = error;
                        this.alertVisible = true;
                    })
                    .then(resp => {
                        this.submitting = false;
                    });
            }
        }
        */
    }
</script>

<style>
</style>
