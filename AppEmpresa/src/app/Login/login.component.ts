import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { EventData, Page, TextField, Observable } from "@nativescript/core";
import { LoginService } from "./login.service";
import { ActivityIndicator } from "@nativescript/core/ui/activity-indicator"


@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('password') passwordField: ElementRef;
  isAuthenticating = false;
  ChallengeDescription = '';
  currentChallenge = '';
  passwordInput = '';
  isLoading = false;
  setColor = false;

  public hideIcon = String.fromCharCode(0xf070);
  public showIcon = String.fromCharCode(0xf06e);
  public showHideIcon: any;
  private showPassword = false;
  public removeFocusEvent: () => void;

  constructor(
    private elementRef: ElementRef,
    private route: Router,
    private page: Page,
    private routerExtensions: RouterExtensions,
    public loginService: LoginService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    //this.page.actionBarHidden = true;
    //this.page.cssClasses.add("login-page-background");
    //this.page.backgroundSpanUnderStatusBar = true;
    this.showHideIcon = this.hideIcon;
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
    this.showHideIcon = this.showPassword ? this.showIcon : this.hideIcon;
    let passField: TextField = this.passwordField.nativeElement;
    passField.secure = !passField.secure;

  }

  async onList() {

    let password = this.passwordInput;
    let user = this.ChallengeDescription;

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

  onSetChallenge() {
    const cleanRut = this.ChallengeDescription.replace(/[^0-9kK]+/g, "").replace(/^0+/, "").toUpperCase();
    const verificationDigit = cleanRut.slice(-1);
    const digits = cleanRut.slice(0, -1).split(/(?=(?:...)*$)/).join(".");
    // return `${digits}-${verificationDigit}`;
    this.ChallengeDescription = `${digits}-${verificationDigit}`;
  }


}
