import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page, TextField } from "@nativescript/core";
import { LoginService } from "./login.service";

@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent /*extends Error*/ implements OnInit {
  @ViewChild("password") passwordField: ElementRef;
  isAuthenticating = false;
  verificationDigit: string | number;
  data?: string | number;
  
  lastDigit: string | number;
  alterRut = '';
  mensajeRut = '';
  pruebaRut = '';

  public hideIcon = String.fromCharCode(0xf070);
  public showIcon = String.fromCharCode(0xf06e);
  public showHideIcon: any;
  private showPassword = false;

  constructor(
    private route: Router,
    private page: Page,
    private routerExtensions: RouterExtensions,
    /*message: string,
    data?: string | number*/
  ) {
    /*super(message);
    this.data = data;*/
  }

  ngOnInit() {
    this.showHideIcon = this.hideIcon;
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
    this.showHideIcon = this.showPassword ? this.showIcon : this.hideIcon;
    let passField: TextField = this.passwordField.nativeElement;
    passField.secure = !passField.secure;
  }

  onList() {
    this.route.navigate(["/listar-empresas"]);
  }

  cleanRut(rut: string) {
    const cleanRut = rut
      .replace(/[^0-9kK]+/g, "")
      .replace(/^0+/, "")
      .toUpperCase();
    return cleanRut;
  }

  pipeRut(cleanRut) {
    const digits = cleanRut
      .slice(0, -1)
      .split(/(?=(?:...)*$)/)
      .join(".");
    return digits;
  }
  
  digitVerForm(rut: string) {
    const sum = rut
      .split("")
      .reverse()
      .reduce(
        (acc, curr, index) => acc + Number(curr) * ((index % 6) + 2),
        0,
      );
    const digit = 11 - (sum % 11);
    const verificationDigit = digit === 10 ? "k" : String(digit);
    return verificationDigit;
  }

  onRutPipeAndValidation() {
    const cleanRut = this.cleanRut(this.alterRut);
    this.lastDigit = cleanRut.slice(-1);
    this.alterRut = `${this.pipeRut(cleanRut)}-${this.lastDigit}`;
    const partialRut = cleanRut.slice(0, cleanRut.length - 1);
    this.pruebaRut = this.digitVerForm(partialRut)
    if (this.verificationDigit !== this.lastDigit) {
     let mensajeRut =  'RUT no válido';
    } else {
      let mensajeRut = 'Rut válido';
    }
  }


}
