import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { EventData, Page, TextField, Observable } from "@nativescript/core";
import { LoginService } from "./login.service";
import { ActivityIndicator } from "@nativescript/core/ui/activity-indicator";
import { refactoringText } from '../shared/refactoringTexts';

@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("password") passwordField: ElementRef;
  isAuthenticating = false;
  verificationDigit: string | number;
  data?: string | number;
  lastDigit: string | number;
  alterRut = '';
  mensajeRut = '';
  pruebaRut = '';
  passwordInput = '';
  isLoading = false;
  setColor = false;
  welcome: string = '';
  info:string = '';
  passHint: string = '';
  rememberPass:string = '';
  passForgotten:string = '';
  private refText = new refactoringText();

  public hideIcon = String.fromCharCode(0xf070);
  public showIcon = String.fromCharCode(0xf06e);
  public showHideIcon: any;
  private showPassword = false;
  public isVisible: boolean = false;

  constructor(
    private route: Router,
    private page: Page,
    private routerExtensions: RouterExtensions,
    public loginService: LoginService,
    private renderer: Renderer2,

  ) {

  }

  ngOnInit() {

    this.page.actionBarHidden = true;


    this.showHideIcon = this.hideIcon;
    this.welcome = this.refText.welcome;
    this.info = this.refText.info;
    this.passHint = this.refText.passHint;
    this.rememberPass = this.refText.rememberPass;
    this.passForgotten = this.refText.passForgotten;
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
    this.showHideIcon = this.showPassword ? this.showIcon : this.hideIcon;
    let passField: TextField = this.passwordField.nativeElement;
    passField.secure = !passField.secure;
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

  calcDigitVer(rut: string) {
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

  async onList() {

    let password = this.passwordInput;
    let user = this.alterRut;

    if (user && password) {

      this.isLoading = true;
      let response = await this.loginService.postLoginP1(user, password);

      if (response) {

        console.log("response from p3",response.access_token, response.rut)
        let rut = response.rut + response.dv;
        let access_token = response.access_token;
        this.isLoading = false;
        this.route.navigate(["/listar-empresas",{rut:rut ,access_token:access_token, name: response.responseBknd.token.cliente.nombre, lastName: response.responseBknd.token.cliente.apellido_paterno}]);

      } else {

        this.isLoading = false;
        console.log("user or password empty");

      }

    } else {

      this.setColor = true;
      console.log("user or password empty");

    }
  }

  getColorPass() {
    if (!this.passwordInput && this.setColor) {
      return 'red'
    }
  }

  getColorUser() {
    if (!this.alterRut && this.setColor) {
      return 'red'
    }

  }


  onRutPipeAndValidation() {

    if(this.alterRut){
      const cleanRut = this.cleanRut(this.alterRut);
      this.lastDigit = cleanRut.slice(-1);
      const partialRut = cleanRut.slice(0, cleanRut.length - 1);

      if(this.isNumeric(partialRut)){

        this.alterRut = `${this.pipeRut(cleanRut)}-${this.lastDigit}`;
        this.verificationDigit = this.calcDigitVer(partialRut);

        if (this.verificationDigit !== this.lastDigit) {
          this.isVisible = true;
          this.mensajeRut = 'El Rut ingresado es incorrecto.';
          throw new Error('Rut no válido');
        } else {
          this.mensajeRut = '';
        }

      } else {
        this.alterRut = ``;
      }
    }
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}












