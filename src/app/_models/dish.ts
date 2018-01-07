import { Base } from './base';
import { User } from './user';

export class Dish extends Base {
  name: string;
  style: string;
  photo: string;
  ingredient: string;
  price: number;
  shippingFee: number;
  additionalDescription: string;
  user: User;
}
