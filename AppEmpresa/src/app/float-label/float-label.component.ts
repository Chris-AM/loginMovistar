import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "@nativescript/core";

@Component({
    selector: "FloatLabel",
    moduleId: module.id, 
    template: `
        <AbsoluteLayout marginTop="5" marginBottom="5">
            <Label #label row="1" [text]="placeholder" top="15" left="18" fontSize="24" class="input"></Label>    
            <TextField #textField row="1" width="90%" top="10" (focus)="onFocus()" (blur)="onBlur()" borderWidth="2" height="40" borderColor="#229EFF" borderRadius="10" padding="2"></TextField>
        </AbsoluteLayout >
    `
})
export class FloatLabel {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @ViewChild("label") label: ElementRef;
    @ViewChild("textField") textField: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    onFocus() {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;

        // animate the label sliding up and less transparent.
        label.animate({
            translate: { x: -25, y: - 30 },
            scale: { x: 0.5, y: 0.5},
            left:0
        }).then(() => { }, () => { });

        // set the border bottom color to green to indicate focus
        textField.borderColor = new Color('#229EFF');
    }

    onBlur() {
        const label = this.label.nativeElement;
        const textField = this.textField.nativeElement;

        // if there is text in our input then don't move the label back to its initial position.
        if (!textField.text) {
            label.animate({
                translate: { x: 0, y: 0 },
                scale: { x: 1, y: 1}
            }).then(() => { }, () => { });
        }
        // reset border bottom color.
        textField.borderColor = new Color('#EFEFEF');
    }
}
