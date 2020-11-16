import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from "@angular/common/http";
import { Endpoints } from '../shared/endpoints/endpoints';
@Injectable({
    providedIn: "root"
})
export class LoginService {

    private url = new Endpoints();

    act_token: string;
    error: string;
    constructor(private http: HttpClient) { }

    async postLoginP1(username: string, password: string) {

        console.log(username, password);
        const url = `${this.url.url_base}` + `${this.url.login}`;
        console.log(url);
        //
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const params = new HttpParams().set('apikey', 'd01d4fb6-de04-4662-9aa9-7a3fa06cb5c6');
        //const bodyData = `username=${'12752279-0'}&password=${'Titi2012'}`; //DEV
        const bodyData = `username=${username}&password=${password}`; //PROD     
        console.log(bodyData, "bodydata");
        const responseP1 = await this.http.post<any>(url, bodyData, { 'headers': headers, 'params': params }).toPromise()
            .catch(error =>
                this.error = error
            );
            if(this.error){
                return this.error;
            }
            
        console.log(responseP1.error.estado.codigoEstado, "responseP1");

        if (responseP1.estado.codigoEstado) {
            console.log("asdasd")
            //if (responseP1.estado.codigoEstado === "200") {
            //authorization
            console.log("asdasd")
            const act_token = responseP1.datos.act_token;
            const url = `${this.url.url_base}` + `${this.url.authorization}`;
            const apikey = 'd01d4fb6-de04-4662-9aa9-7a3fa06cb5c6';
            const bodyData = `act_token=${act_token}&response_type=${'code'}&apikey=${apikey}`;
            const responseP2 = await this.http.post<any>(url, bodyData, { 'headers': headers }).toPromise();


            if (responseP2.datos.code) {

                let codeP2 = responseP2.datos.code;
                //token
                let url = `${this.url.url_base}` + `${this.url.token}`;
                let client_id = '249848ee-e80e-4b50-b519-b59cea27be05';
                let client_secret = '4eb16546-7d39-4491-b6b6-9816ed5b9a7c';
                //stepThreeKey
                let redirect_uri = `${this.url.stepThreeKey}`
                const bodyData = `client_id=${client_id}&client_secret=${client_secret}&code=${codeP2}&redirect_uri=${redirect_uri}&grant_type=${'authorization_code'}`;

                return await this.http.post<any>(url, bodyData, { 'headers': headers }).toPromise();

            }
            //  }
        } else {


            console.log("respuesta mala")
            console.log(responseP1.error.estado.codigoEstado);
            return responseP1.error.estado.codigoEstado;
        }
        // // if (responseP1.error.estado.codigoEstado) {
        // //     if (responseP1.error.estado.codigoEstado == "130") {

        // //         console.log("respuesta mala")
        // //         console.log(responseP1.error.estado.codigoEstado);
        // //         return responseP1.error.estado.codigoEstado;
        // //     }
        // // }
        // // console.log("asdasd")



    }
}
