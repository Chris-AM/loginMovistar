import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from "@angular/common/http";
import { AsyncAction } from "rxjs/internal/scheduler/AsyncAction";

@Injectable({
    providedIn: "root"
})
export class LoginService {

    act_token:string;

    constructor(private http: HttpClient){}
    
    async postLoginP1(username:string, password:string){
        const url = 'https://apix.movistar.cl/oauth2/login-app/loginCajetin?apikey=d01d4fb6-de04-4662-9aa9-7a3fa06cb5c6';
        
        const bodyData = `username=${'12752279-0'}&password=${'Titi2012'}`; //DEV
        //const bodyData = `username=${username}&password=${password}`; //PROD     
        
        const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        const params = new HttpParams().set('apikey', 'd01d4fb6-de04-4662-9aa9-7a3fa06cb5c6');
        
        const responseP1 = await this.http.post<any>(url, bodyData , {'headers':headers, 'params': params }).toPromise();
        const act_token = responseP1.datos.act_token

        if(act_token){

            const url = 'https://apix.movistar.cl/oauth2/userAuthorize';
            const apikey = 'd01d4fb6-de04-4662-9aa9-7a3fa06cb5c6';         
            const bodyData = `act_token=${act_token}&response_type=${'code'}&apikey=${apikey}`; 
            const responseP2 = await this.http.post<any>(url, bodyData , {'headers':headers }).toPromise();
        

            if(responseP2.datos.code){

                let codeP2 = responseP2.datos.code
                let url = 'https://apix.movistar.cl/oauth2/token';
                let client_id = '249848ee-e80e-4b50-b519-b59cea27be05';
                let client_secret ='4eb16546-7d39-4491-b6b6-9816ed5b9a7c';
                let redirect_uri = 'https://myloginOauth.net/auth-code';
                const bodyData = `client_id=${client_id}&client_secret=${client_secret}&code=${codeP2}&redirect_uri=${redirect_uri}&grant_type=${'authorization_code'}`;        
                
               return await this.http.post<any>(url, bodyData , {'headers':headers }).toPromise();
             
            }
        }     
       
    }
}
