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
<<<<<<< HEAD

=======
  @ViewChild("msjRutLb") msjRutLb: ElementRef;
  @ViewChild("msjPassLb") msjPassLb: ElementRef;
  @ViewChild("buttonIngresar") buttonIngresar: ElementRef;
  @ViewChild("inputRut") inputRut: ElementRef;
  @ViewChild("formLogin") formLogin: ElementRef;

  
>>>>>>> fix/login
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
  info: string = '';
  passHint: string = '';
  rememberPass: string = '';
  passForgotten: string = '';
<<<<<<< HEAD

=======
  validateRut: boolean;
>>>>>>> fix/login
  private refText = new refactoringText();

  public hideIcon = String.fromCharCode(0xf070);
  public showIcon = String.fromCharCode(0xf06e);
  public showHideIcon: any;
  private showPassword = false;
  //public isVisible: boolean = false;

  constructor(
    private route: Router,
    private page: Page,
    private routerExtensions: RouterExtensions,
    public loginService: LoginService,
    private renderer: Renderer2,

  ) {

  }

  ngOnInit() {

<<<<<<< HEAD
    this.page.actionBarHidden = true;

=======

  
    this.page.actionBarHidden = true;
>>>>>>> fix/login

    this.mensajeRut = this.refText.text1;
    this.showHideIcon = this.hideIcon;
    this.welcome = this.refText.welcome;
    this.info = this.refText.info;
    this.passHint = this.refText.text2;
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

      const form = this.formLogin.nativeElement;
      this.renderer.setStyle(form, 'opacity', '0.5');

      let response = await this.loginService.postLoginP1(user, password);
<<<<<<< HEAD
=======
      console.log("respuesta");
      console.log(response);
     
>>>>>>> fix/login

      if (response) {

        console.log("response from p3", response.access_token, response.rut)
        let rut = response.rut + response.dv;
        let access_token = response.access_token;
        this.isLoading = false;
<<<<<<< HEAD
=======

        const form = this.formLogin.nativeElement;
        this.renderer.setStyle(form, 'opacity', '1');
        this.renderer.setAttribute(form, "isEnabled", "true");

>>>>>>> fix/login
        this.route.navigate(["/listar-empresas", { rut: rut, access_token: access_token }]);

      } else {

        this.isLoading = false;
<<<<<<< HEAD
        console.log("user or password empty");

=======
        console.log("user or password empty1");
        
        const rut = this.inputRut.nativeElement;
        this.renderer.setStyle(rut, 'color', '#red');

        const pass = this.passwordField.nativeElement;
        this.renderer.setStyle(pass, 'color', '#red');
        //ponerse en rojo los textfield
>>>>>>> fix/login
      }

    } else {

<<<<<<< HEAD
      this.setColor = true;
      console.log("user or password empty");
=======


      this.isLoading = false;
      this.setColor = true;
      console.log("user or password empty2");
>>>>>>> fix/login

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
    const label = this.msjPassLb.nativeElement;
    this.renderer.setStyle(label, 'color', '#008edd');

    if (this.alterRut) {
      const cleanRut = this.cleanRut(this.alterRut);
      this.lastDigit = cleanRut.slice(-1);
      const partialRut = cleanRut.slice(0, cleanRut.length - 1);

      if (this.isNumeric(partialRut)) {

        this.alterRut = `${this.pipeRut(cleanRut)}-${this.lastDigit}`;
        this.verificationDigit = this.calcDigitVer(partialRut);

        if (this.verificationDigit !== this.lastDigit) {
          //this.isVisible = true;
          console.log("rut no valido")
          this.validateRut = false;
          this.mensajeRut = this.refText.textError;
          //throw new Error('Rut no válido');
        } else {
          this.validateRut = true;
          this.mensajeRut = this.refText.text1;
        }

      } else {
        this.alterRut = ``;
      }
    } else {
      //console.log("rut en blanco")

    }
    this.setEnabled();


  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
<<<<<<< HEAD
}

=======

  tapRut() {
    this.setEnabled();
    console.log("tapRut")
    const label = this.msjRutLb.nativeElement;
    this.renderer.setStyle(label, 'color', '#008edd');
  }

  outRut() {
    this.onRutPipeAndValidation();
    if (this.validateRut) {
      console.log("blurRut")
      const label = this.msjRutLb.nativeElement;
      this.renderer.setStyle(label, 'color', '#50535a');
    } else {
      const label = this.msjRutLb.nativeElement;
      this.renderer.setStyle(label, 'color', '#eb3434');
    }
    this.setEnabled();
>>>>>>> fix/login

  }

<<<<<<< HEAD


=======
  outPass() {
    console.log("outPass")
    const label = this.msjPassLb.nativeElement;
    this.renderer.setStyle(label, 'color', '#50535a');
    this.setEnabled();
  }


  setEnabled() {

    const rut:TextField = <TextField> this.page.getViewById("rut-loginTextField");
    const password:TextField = <TextField> this.page.getViewById("password-loginTextField");    
  
    if (rut.text.length > 0 && password.text.length > 0) {
      console.log("setEnabled true")
      const btn = this.buttonIngresar.nativeElement;
      this.renderer.setAttribute(btn, "isEnabled", "true");

    } else {
      console.log("setEnabled false",this.alterRut,this.passwordInput )
      const btn = this.buttonIngresar.nativeElement;
      this.renderer.setAttribute(btn, "isEnabled", "false");
    }

  }
}





>>>>>>> fix/login







