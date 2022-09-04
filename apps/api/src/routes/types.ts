export interface UserBody {
    name: string;
    picture: string;
    email: string;
}

export interface UserSession {
    displayName: string;
    emails: Prop[];
    photos: Prop[];
}
interface Prop {
    value: string;
    verified?: boolean;
}
