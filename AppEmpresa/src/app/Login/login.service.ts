import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from "@angular/common/http";
import { Endpoints } from '../shared/endpoints/endpoints';
@Injectable({
    providedIn: "root"
})
export class LoginService {

    private url = new Endpoints();

    act_token:string;

    constructor(private http: HttpClient){}

    async postLoginP1(username:string, password:string){

        console.log(username,password);
        const url = `${this.url.url_base}`+`${this.url.login}`;
        console.log(url);
        //
        const bodyData = `username=${'12752279-0'}&password=${'Titi2012'}`; //DEV
        // const bodyData = `username=${username}&password=${password}`; //PROD
        console.log(bodyData);
        const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        const params = new HttpParams().set('apikey', 'd01d4fb6-de04-4662-9aa9-7a3fa06cb5c6');
        const responseP1 = await this.http.post<any>(url, bodyData , {'headers':headers, 'params': params }).toPromise();
        console.log(responseP1.estado.codigoEstado);
        const codigoEstado = responseP1.estado.codigoEstado
        const act_token = responseP1.datos.act_token
        console.log(codigoEstado);


        // if (codigoEstado === "130") {

        //     return responseP1;
        // }


        if(username != '12.752.279-0' || password != 'Titi2012') {
            let json = {'estado':false};
            return json
        }
        if (codigoEstado === "200") {

            //authorization
            const url = `${this.url.url_base}`+`${this.url.authorization}`;
            const apikey = 'd01d4fb6-de04-4662-9aa9-7a3fa06cb5c6';
            const bodyData = `act_token=${act_token}&response_type=${'code'}&apikey=${apikey}`;
            const responseP2 = await this.http.post<any>(url, bodyData , {'headers':headers }).toPromise();


            if (responseP2.datos.code) {

                let codeP2 = responseP2.datos.code;
                //token
                let url = `${this.url.url_base}` + `${this.url.token}`;
                let client_id = '249848ee-e80e-4b50-b519-b59cea27be05';
                let client_secret = '4eb16546-7d39-4491-b6b6-9816ed5b9a7c';
                //stepThreeKey
                let redirect_uri = `${this.url.stepThreeKey}`
                const bodyData = `client_id=${client_id}&client_secret=${client_secret}&code=${codeP2}&redirect_uri=${redirect_uri}&grant_type=${'authorization_code'}`;

                return await this.http.post<any>(url, bodyData , {'headers':headers }).toPromise();

            }

        }else{
            return responseP1;
        }
    }



}
