export interface User {
    uid?: string;
    email: string;
    firstName?: string,
    lastName?: string,
    address?: string,
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    isAdmin?:boolean;
    aboutMe?:string
 }