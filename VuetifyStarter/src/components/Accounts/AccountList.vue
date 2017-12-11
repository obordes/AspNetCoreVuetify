<!-- User account management component -->
<template>
    <div>
        <!--<v-alert color="error" icon="warning" v-model="errorMessage.length > 0" transition="scale-transition">{{errorMessage}}</v-alert>-->
        <v-data-table class="elevation-3"
                      :headers="headers"
                      :items="users"
                      :hide-actions="true">
            <!-- Row template -->
            <template slot="items" slot-scope="props">
                <td>{{ props.item.lastName }}</td>
                <td>{{ props.item.firstName }}</td>
                <td>{{ props.item.email }}</td>
                <td class="text-xs-center"><v-checkbox disabled v-model="props.item.isElfStaff"></v-checkbox></td>
                <td class="text-xs-center"><v-checkbox disabled v-model="props.item.isAdmin"></v-checkbox></td>
                <td class="text-xs-center">
                    <v-tooltip top>
                        <v-btn icon slot="activator" @click.stop="showEditor(props.item)">
                            <v-icon style="font-size:16px;">fa-pencil-alt</v-icon>
                        </v-btn>
                        <span>Edit account</span>
                    </v-tooltip>
                </td>
                <td class="text-xs-center">
                    <v-tooltip top>
                        <v-btn icon slot="activator" @click.stop="deleteConfirm(props.item.id)">
                            <v-icon style="font-size:16px;">fa-trash-alt</v-icon>
                        </v-btn>
                        <span>Delete account</span>
                    </v-tooltip>
                </td>
            </template>

            <!-- No-data template -->
            <template slot="no-data">
                <v-alert color="warning" icon="warning" :value="true">Could not retrieve user accounts :(</v-alert>
            </template>

            <!-- Footer template -->
            <template slot="footer">
                <v-btn color="primary" @click.stop="showEditor()">New user account</v-btn>
            </template>
        </v-data-table>
        <v-dialog v-if="edited" persistent v-model="editorVisible" max-width="600px">
            <!--<v-btn color="primary" dark slot="activator">New user account</v-btn>-->
            <account :edited="edited" @editor-closed="hideEditor"></account>
        </v-dialog>
        <v-snackbar color="success" top :timeout="3000" v-model="toastVisible">{{ outcome }}</v-snackbar>
        <v-dialog persistent v-model="deleteConfirmVisible" max-width="290">
            <v-card>
                <v-card-title class="headline">Delete user account</v-card-title>
                <v-card-text>Confirm deletion of user account?</v-card-text>
                <v-card-actions>
                    <v-btn @click="deleteConfirmVisible = false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="deleteAccount">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import Account from './Account.vue';
    import { IUser } from '../../store/User';
    import { mapActions, mapGetters } from 'vuex';
    import { HTTP } from '../../helpers/http';

    @Component({
        components: { Account }
    })
    export default class AccountListComponent extends Vue {
        headers : any[] = [
            { text: 'Last name', align: 'left', value: 'lastName' },
            { text: 'First name', align: 'left', value: 'firstName' },
            { text: 'Email', align: 'left', value: 'email' },
            { text: 'ELF Staff', align: 'center', value: 'isElfStaff' },
            { text: 'Admin', align: 'center', value: 'isAdmin' }
        ];
        users: IUser[] = [];
        edited: IUser | null = null;
        errorMessage: string = '';
        editorVisible: boolean = false;      
        toastVisible: boolean = false;
        outcome: string | null = null;
        deleteConfirmVisible: boolean = false;
        deleteId: string | null;

        showEditor(user?: IUser): void {
            this.edited = user ? user : {
                id: '',
                lastName: '',
                firstName: '',
                userName: '',
                email: '',
                token: '',
                isElfStaff: false,
                isAdmin: false
            }
            console.log("edit " + this.edited.lastName);
            this.editorVisible = true;
        };

        hideEditor(outcome: string | null, user: IUser | null): void {
            if (user != null && outcome != null) {
                this.outcome = outcome;
                this.toastVisible = true;
                this.users.push(user);
            } else if (outcome != null) {
                this.outcome = outcome;
                this.toastVisible = true;
            }
            this.edited = null;
            this.editorVisible = false;
        };

        deleteConfirm(id: string): void {
            this.deleteId = id;
            this.deleteConfirmVisible = true;
        };

        async deleteAccount() {
            if (!this.deleteId || this.deleteId.length === 0)
                return;

            this.deleteConfirmVisible = false;
            console.log("deleted " + this.deleteId);
            try {
                const response = await HTTP.delete(`/api/accounts/${this.deleteId}`);
                if (response.status === 204) {
                    this.outcome = 'User account deleted.';
                    this.toastVisible = true;
                    await this.loadAccounts();
                }
            } catch (error) {
                this.errorMessage = error.response.data;
            }      
        };

        async loadAccounts() {
            //HTTP.get('/api/accounts')
            //    .then(resp => this.users = resp.data ? <IUser[] > resp.data : [])
            //    .catch(error => this.errorMessage = "Could not retrieve user accounts.");
            try {
                const response = await HTTP.get('/api/accounts');
                this.users = response.data ? <IUser[] > response.data : [];
            } catch (e) {
                this.errorMessage = "Could not retrieve user accounts :(";
            }
        };

        async mounted() {
            this.$store.dispatch('setTitle', 'Manage user accounts');
            await this.loadAccounts();
        };
    }
</script>

<style>
</style>
