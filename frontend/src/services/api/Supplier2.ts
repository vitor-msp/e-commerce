import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IProduct } from "../../store/products/products.types";
import { isHttpStatusSuccess } from "../../utils/api-utils";
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
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SUPPLIER2_URL,
    });
  }

  async getAllProducts(): Promise<IProduct[]> {
    const res: AxiosResponse<ProductSupplier2[]> = await this.api
      .get("/")
      .then((res) => res)
      .catch((error) => error.response);
    //@ts-ignore
    if (!isHttpStatusSuccess(res.status)) throw new Error(res.data);
    return res.data.map((product) => {
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
        id: "2:" + id,
        name,
        description,
        category: details.adjective,
        material: details.material,
        price: +price,
        discountValue: hasDiscount ? +discountValue : 0,
        images: [...gallery],
        cart: false,
      };
    });
  }

  getProductById(id: string): Promise<IProduct> {
    throw new Error("Method not implemented.");
  }
}
