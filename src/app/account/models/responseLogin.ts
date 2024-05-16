import { UserToken } from "./userToken";

export interface ResponseLogin {
accessToken: string,
expiresIn: number,
refreshToken: any,
responseResult: any,
userToken: UserToken
}