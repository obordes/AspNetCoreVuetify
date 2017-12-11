<template>
    <v-form v-model="valid">
        <v-card>
            <v-card-title>
                <span class="headline">Change password</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout wrap @keydown="errors.clear($event.target.name)">
                        <v-flex xs12>
                            <v-text-field label="Old password" v-model="model.oldPassword" required min="6" :rules="passwordRules"
                                          :error="errors.has('oldPassword')" :error-messages="errors.get('oldPassword')"
                                          :append-icon="oldPwdHidden ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (oldPwdHidden = !oldPwdHidden)"
                                          :type="oldPwdHidden ? 'password' : 'text'"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="New Password" v-model="model.newPassword" required min="6" :rules="passwordRules"
                                          :error="errors.has('newPassword')" :error-messages="errors.get('newPassword')"
                                          :append-icon="newPwdHidden ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (newPwdHidden = !newPwdHidden)"
                                          :type="newPwdHidden ? 'password' : 'text'"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Confirm new Password" v-model="model.confirmPassword" required min="6" :rules="passwordRules"
                                          :error="errors.has('confirmPassword')" :error-messages="errors.get('confirmPassword')"
                                          :append-icon="cnfPwdHidden ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (cnfPwdHidden = !cnfPwdHidden)"
                                          :type="cnfPwdHidden ? 'password' : 'text'"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-alert color="error" icon="warning" dismissible v-model="alertVisible" transition="scale-transition">{{errorMessage}}</v-alert>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" :loading="submitting" :disabled="!valid" color="primary">
                    Change
                    <!--<span slot="loader">Please wait...</span>-->
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar color="success" top :timeout="3000" v-model="toastVisible">{{ outcome }}</v-snackbar>
    </v-form>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { HTTP } from '../../helpers/http';
    import { Errors } from '../../helpers/Errors';

    type ChangePasswordModel = { oldPassword: string, newPassword: string, confirmPassword: string };

    @Component
    export default class ChangePasswordComponent extends Vue {
        submitting: boolean = false;
        valid: boolean = false;
        alertVisible: boolean = false;
        toastVisible: boolean = false;
        outcome: string | null = null;
        oldPwdHidden: boolean = true;
        newPwdHidden: boolean = true;
        cnfPwdHidden: boolean = true;
        model: ChangePasswordModel = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        errorMessage: string = '';
        errors: Errors = new Errors();
        passwordRules: [(v: string) => true | string] = [
            (v: string) => !!v || 'Required field.',
            (v: string) => (v && v.length >= 6) || 'At least 6 characters'
        ];

        async submit() {
            this.alertVisible = false;
            this.toastVisible = false;
            this.submitting = true;
            this.outcome = null;

            try {
                const response = await HTTP.post('/api/accounts/changepassword', this.model)
                this.outcome = response.data;
                this.toastVisible = true;
                this.model = {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                };
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errors.record(error.response.data);
                } else {
                    this.errorMessage = error.response ? error.response.statusText : error;
                    this.alertVisible = true;
                }
            } finally {
                this.submitting = false;
            }
        }

        mounted(): void {
            this.$store.dispatch('setTitle', 'Change password');
        };
    }
</script>

<style>
</style>
