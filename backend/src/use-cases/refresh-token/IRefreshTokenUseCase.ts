import { RefreshTokenInput } from "./RefreshTokenInput";
import { RefreshTokenOutput } from "./RefreshTokenOutput";

export interface IRefreshTokenUseCase {
  execute(input: RefreshTokenInput): Promise<RefreshTokenOutput>;
}
