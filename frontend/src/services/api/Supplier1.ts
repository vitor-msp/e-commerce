// import axios, { AxiosInstance } from "axios";
import { IProduct } from "../../store/products/products.types";
import { IProductsApi } from "./IProductsApi";

export class Supplier1 implements IProductsApi {
  //   private readonly api: AxiosInstance;

  constructor() {
    // this.api = axios.create({
    //   baseURL: process.env.REACT_APP_SUPPLIER1_URL,
    // });
  }

  async getAllProducts(): Promise<IProduct[]> {
    return [
      {
        id: "1",
        description: "v2wv",
        category: "weqre",
        discountValue: 0.2,
        name: "wcqe",
        price: 15.67,
        material: "eçwkjcn",
        images: [
          "http://placeimg.com/640/480/business",
          "http://placeimg.com/640/480/business",
        ],
      },
      {
        id: "1",
        description: "v2wv",
        category: "weqre",
        discountValue: 0.2,
        name: "wcqe",
        price: 15.67,
        material: "eçwkjcn",
        images: [
          "http://placeimg.com/640/480/business",
          "http://placeimg.com/640/480/business",
        ],
      },
    ];
  }

  getProductById(id: string): Promise<IProduct> {
    throw new Error("Method not implemented.");
  }
}
