export interface User {
    uid?: string;
    email: any;
    firstName?: string,
    lastName?: string,
    address?: string,
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    isAdmin?: boolean;
    aboutMe?: string;
    tokenFCM?: string
 }