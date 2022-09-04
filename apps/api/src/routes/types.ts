export interface UserBody {
    _json: UserJson;
}

interface UserJson {
    name: string;
    picture: string;
    email: string;
}
