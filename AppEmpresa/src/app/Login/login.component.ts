import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { EventData, Page, TextField, Observable } from "@nativescript/core";
import { LoginService } from "./login.service";
import { ActivityIndicator } from "@nativescript/core/ui/activity-indicator";


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
  mensBienvenida = '¡Nos alegra verte aquí!';
  infoEntrada = 'Ingresaa conocer el resumen y consumo de tus cuentas';
  pistaPassword = 'La misma que usas para ingresar a la sucursal virtual';
  recRut = 'Recordar mi Rut';
  olvidoPass = 'Si olvidaste tu contraseña, haz clic aquí';


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
    private renderer: Renderer2
  
  ) { }

  ngOnInit() {
    this.showHideIcon = this.hideIcon;
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
      
        console.log(response)
        this.isLoading = false;
        this.route.navigate(["/listar-empresas"]);
      } else {
      
        this.isLoading = false;
        console.log("user or password empty");
      
      }
      
    } else {
      
      this.setColor = true;
      console.log("user or password empty");
    
    }
  }

  getColor() {
    if (!this.passwordInput && this.setColor) {
      return 'red'
    }
  }


  onRutPipeAndValidation() {
    
    const cleanRut = this.cleanRut(this.alterRut);
    this.lastDigit = cleanRut.slice(-1);
    this.alterRut = `${this.pipeRut(cleanRut)}-${this.lastDigit}`;
    const partialRut = cleanRut.slice(0, cleanRut.length - 1);
    this.verificationDigit = this.calcDigitVer(partialRut)
    
   
    if (this.verificationDigit !== this.lastDigit) {
      this.isVisible = true;
      this.mensajeRut = 'El Rut ingresado es incorrecto.';
      throw new Error('Rut no válido');
    } else {
      this.mensajeRut = '';
    }


  }
}
  

  


  

  
   



