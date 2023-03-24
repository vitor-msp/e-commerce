import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IProduct } from "../../../store/products/products.types";
import { isHttpStatusSuccess } from "../../../utils/api-utils";
import { IProductsApi } from "./IProductsApi";

type ProductSupplier1 = {
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string;
  preco: number;
  material: string;
  id: string;
};

export class Supplier1 implements IProductsApi {
  readonly supplierId: string = "1";
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SUPPLIER1_URL,
    });
  }

  async getAllProducts(): Promise<IProduct[]> {
    const res: AxiosResponse<ProductSupplier1[]> = await this.api
      .get("/")
      .then((res) => res)
      .catch((error) => error.response);
    //@ts-ignore
    if (!isHttpStatusSuccess(res.status)) throw new Error(res.data);
    return res.data.map((product) => {
      const { categoria, descricao, id, imagem, material, nome, preco } =
        product;
      return {
        supplier: "1",
        id,
        name: nome,
        description: descricao,
        category: categoria,
        material,
        price: +preco,
        discountValue: 0,
        images: [imagem],
        cart: false,
        cartQuantity: 1,
      };
    });
  }

  async getProductById(id: string): Promise<IProduct> {
    let error = true;
    const res: ProductSupplier1 = await this.api
      .get(`/${id}`)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res);
    const { categoria, descricao, imagem, material, nome, preco } = res;
    return {
      supplier: this.supplierId,
      id: res.id,
      name: nome,
      description: descricao,
      category: categoria,
      material,
      price: +preco,
      discountValue: 0,
      images: [imagem],
      cart: false,
      cartQuantity: 1,
    };
  }
}
