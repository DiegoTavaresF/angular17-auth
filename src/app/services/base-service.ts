import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService {

    protected AccountApiServiceUrl: string = environment.accountApiServiceUrl;
    public LocalStorage = new LocalStorageUtils();

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected GetAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        };
    }

    protected GetAuthHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`,
            })
        };
    }

    protected extractData(response: any) {
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse:any = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Unknow error");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("There was an error, please try again later or contact our support.");
            
            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly                
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        console.error(response);
        return throwError(response);
    }
}