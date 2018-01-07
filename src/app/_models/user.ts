import { Base } from './base';
import { Dish } from './dish';

export class User extends Base {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    location: string;
}
