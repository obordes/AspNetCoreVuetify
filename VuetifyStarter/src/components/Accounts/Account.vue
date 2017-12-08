<!-- src/components/Accounts/Account.vue -->
<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field label="Last name" v-model="user.lastName" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="First name" v-model="user.firstName" hint="optional"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Email" v-model="user.email" required :rules="emailRules" :counter="50" XXXprepend-icon="mail"></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if="isNew">
                        <v-text-field label="Initial password" v-model="user.password" required min="6" :rules="passwordRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-checkbox label="Member of ELF staff" v-model="user.isElfStaff" primary></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-checkbox label="Administrator" v-model="user.isAdmin" XXXprimary></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="$emit('dialog-cancelled')">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="submit">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>


<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { HTTP } from '../../helpers/http';
    import { IUser } from '../../store/User';

    @Component
    export default class AccountComponent extends Vue {
        @Prop() edited: IUser;
        user: IUser = this.edited;
        submitting: boolean = false;
        alertVisible: boolean = false;
        errorMessage: string = '';

        emailRules: [(v: string) => true | string] = [
            (v: string) => !!v || 'E-mail is required',
                    (v: string) => (v && v.length <= 50) || 'Max 50 characters',
            (v: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail is not valid'
        ];
        passwordRules: [(v: string) => true | string] = [
            (v: string) => !!v || 'Password is required',
            (v: string) => (v && v.length >= 6) || 'At least 6 characters'
        ];

        get isNew() {
            return !(this.user && this.user.id && this.user.id.length > 0);
        }
        get title() {
            return this.isNew ? 'Create a new user account' : 'Edit an existing user account';
        }

        async submit() {
            console.log("submit");
            this.alertVisible = false;
            this.submitting = true;

            if (this.isNew) {
                try {
                    const response = await HTTP.post('/api/accounts', this.user);
                    this.submitting = false;
                } catch (e) {
                    this.errorMessage = "Could not retrieve user accounts :(";
                    this.alertVisible = true;
                }
            } else {
                try {
                    const response = await HTTP.put('/api/accounts', this.user);
                    this.submitting = false;
                } catch (e) {
                    this.errorMessage = "Could not retrieve user accounts :(";
                    this.alertVisible = true;
                }
            }
            
        }

        created() {
            console.log("created");
        }
    }
</script>

<style>
</style>
