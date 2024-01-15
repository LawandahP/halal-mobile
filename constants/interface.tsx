export interface ErrorObject {
    detail: {
        // full_name?: string[] | null;
        // username?: string[] | null;
        // email?: string[] | null;
        // phone_number?: string[] | null;
        // password?: string[] | null
    };
}

export interface UserInfoInterface {
    id: number;
    full_name: string;
    username: string;
    email: string;
    phone_number: any;
    created_at: any;
}