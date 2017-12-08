import Vue from 'vue';
import { IUser } from './User';

/** The vuex state. */
export interface State {
    /** Indicates whether the left navigation drawer is expanded. */
    drawerExpanded: boolean;
    /** Gets or sets the title of the current page. */
    title: string;
    /** Gets or sets the logged-in user. */
    user: IUser | null;
}
