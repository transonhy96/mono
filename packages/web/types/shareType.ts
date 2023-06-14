import { User } from "./userType";

export interface Share {
    id?: number;
    url: string;
    user_id: string;
    email: string;
    user?: User;
    created_at?: number;
}
