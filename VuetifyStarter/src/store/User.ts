/** Represents the logged in user. */
export interface IUser {
    id: string;
    userName: string;
    email: string;
    lastName: string;
    firstName: string | null;
    token: string;
    isElfStaff: boolean;
    isAdmin: boolean;
}


