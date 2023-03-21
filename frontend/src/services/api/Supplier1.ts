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
        name: "string",
        description: "string",
        images: [
          "http://placeimg.com/640/480/business",
          "http://placeimg.com/640/480/business",
        ],
        price: 20,
        discountValue: 0.3,
        category: "string",
        material: "string",
      },
      {
        id: "1",
        name: "string",
        description: "string",
        images: [
          "http://placeimg.com/640/480/business",
          "http://placeimg.com/640/480/business",
        ],
        price: 20,
        discountValue: 0.3,
        category: "string",
        material: "string",
      },
    ];
    // return new Promise(() => {
    //   setTimeout(() => {
    //   }, 1000);
    // });
  }

  getProductById(id: string): Promise<IProduct> {
    throw new Error("Method not implemented.");
  }
}
