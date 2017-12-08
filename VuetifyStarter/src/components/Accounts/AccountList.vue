<!-- User account management component -->
<template>
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
                <v-btn icon @click.native.stop="showEditor(props.item)">
                    <v-icon style="font-size:16px;">fa-pencil-alt</v-icon>
                </v-btn>
                <!--<v-dialog XXXpersistent v-model="props.dialogVisible" max-width="600px">
                    <v-btn icon slot="activator">
                        <v-icon style="font-size:16px;">fa-pencil-alt</v-icon>
                    </v-btn>
                    <account :edited="props.item" @dialog-cancelled="props.dialogVisible = false"></account>
                </v-dialog>-->
            </td>
            <td class="text-xs-center">
                <v-tooltip top>
                    <v-btn icon slot="activator">
                        <v-icon style="font-size:16px;">fa-trash-alt</v-icon>
                    </v-btn>
                    <span>Delete user account</span>
                </v-tooltip>
            </td>
        </template>

        <!-- No-data template -->
        <template slot="no-data">
            <v-alert color="warning" icon="warning" :value="true">Could not retrieve user accounts :(</v-alert>
        </template>

        <!-- Footer template -->
        <template slot="footer">
            <v-btn color="primary" @click.native.stop="showEditor()">New user account</v-btn>
            <v-dialog v-if="edited" persistent v-model="dialogVisible" max-width="600px">
                <!--<v-btn color="primary" dark slot="activator">New user account</v-btn>-->
                <account :edited="edited" @dialog-cancelled="hideEditor"></account>
            </v-dialog>
        </template>
    </v-data-table>
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
        dialogVisible: boolean = false;      

        showEditor(user?: IUser): void {
            this.edited = user ? user : {
                id: '',
                lastName: 'Legrave',
                firstName: 'Félix',
                userName: '',
                email: '',
                token: '',
                isElfStaff: false,
                isAdmin: false
            }
            console.log("edit " + this.edited.lastName);
            this.dialogVisible = true;
        };

        hideEditor(): void {
            this.edited = null;
            this.dialogVisible = false;
        };

        async mounted() {
            this.$store.dispatch('setTitle', 'Manage user accounts');

            //HTTP.get('/api/accounts')
            //    .then(resp => this.users = resp.data ? <IUser[] > resp.data : [])
            //    .catch(error => this.errorMessage = "Could not retrieve user accounts.");
            try {
                const response = await HTTP.get('/api/accounts');
                this.users = response.data ? <IUser[]>response.data : [];
            } catch (e) {
                this.errorMessage = "Could not retrieve user accounts :(";
            }
        };
    }
</script>

<style>
</style>
