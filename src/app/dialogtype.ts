import { Product } from "./product";

export interface DialogType {
    message: String,
    title: String,
    productId: number,
    product: Product,
}
