import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IProduct } from "../../../store/products/products.types";
import { isHttpStatusSuccess } from "../../../utils/api-utils";
import { IProductsApi } from "./IProductsApi";

type ProductSupplier2 = {
  id: string;
  name: string;
  description: string;
  details: {
    adjective: string;
    material: string;
  };
  gallery: string[];
  price: number;
  hasDiscount: boolean;
  discountValue: number;
};

export class Supplier2 implements IProductsApi {
  readonly supplierId: string = "2";
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SUPPLIER2_URL,
    });
  }

  async getAllProducts(): Promise<IProduct[]> {
    let error = true;
    const res: ProductSupplier2[] = await this.api
      .get("/")
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res);
    return res.map((product) => {
      const {
        description,
        details,
        gallery,
        id,
        name,
        price,
        discountValue,
        hasDiscount,
      } = product;
      return {
        supplier: "2",
        id,
        name,
        description,
        category: details.adjective,
        material: details.material,
        price: +price,
        discountValue: hasDiscount ? +discountValue : 0,
        images: [...gallery],
        cart: false,
        cartQuantity: 1,
      };
    });
  }

  async getProductById(id: string): Promise<IProduct> {
    let error = true;
    const res: ProductSupplier2 = await this.api
      .get(`/${id}`)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res);
    const {
      description,
      details,
      discountValue,
      gallery,
      hasDiscount,
      name,
      price,
    } = res;
    return {
      supplier: this.supplierId,
      id: res.id,
      name,
      description,
      category: details.adjective,
      material: details.material,
      price: +price,
      discountValue: hasDiscount ? +discountValue : 0,
      images: [...gallery],
      cart: false,
      cartQuantity: 1,
    };
  }
}
