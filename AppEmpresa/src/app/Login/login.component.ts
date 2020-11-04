import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page, TextField } from "@nativescript/core";
import { LoginService } from "./login.service";

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('password') passwordField: ElementRef;
    isAuthenticating = false;
    ChallengeDescription='';
    currentChallenge='';

    public hideIcon = String.fromCharCode(0xf070);
    public showIcon = String.fromCharCode(0xf06e);
    public showHideIcon: any;
    private showPassword = false;

    constructor(
      private route:Router,
      private page: Page,
      private routerExtensions: RouterExtensions,
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

    onList(){
        this.route.navigate(["/listar-empresas"]);

    }

    onSetChallenge(){
      const cleanRut = this.ChallengeDescription.replace(/[^0-9kK]+/g, "").replace(/^0+/, "").toUpperCase();
      const verificationDigit = cleanRut.slice(-1);
      const digits = cleanRut.slice(0, -1).split(/(?=(?:...)*$)/).join(".");
     // return `${digits}-${verificationDigit}`;
      this.ChallengeDescription = `${digits}-${verificationDigit}`;
    }

  }
