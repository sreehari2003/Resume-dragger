export interface Dt {
    user: any;
    isUserLoading: boolean;
    callForUserInfo: () => void;
}
export interface Data {
    name: string;
    resume: string;
    id: string;
}
export interface File {
    name: string;
    id: string;
}
export interface Folder {
    name: string;
    id: string;
    File: File[];
}

export interface Prop {
    resume: Data[];
    folder: Folder[];
}

export interface User {
    data: Prop;
    ok: boolean;
}
