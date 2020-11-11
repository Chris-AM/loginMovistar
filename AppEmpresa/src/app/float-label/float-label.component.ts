import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "@nativescript/core";

@Component({
    selector: "FloatLabel",
    moduleId: module.id, 
    template: `
        <AbsoluteLayout marginTop="20" marginBottom="5">
            <TextField #textField row="0" width="90%" top="10" (focus)="onFocus()" (blur)="onBlur()" borderWidth="2" height="40" borderColor="#229EFF" borderRadius="10" padding="2"></TextField>
            <Label #label row="0" zIndex="99" marginTop="3" padding="5" [text]="placeholder" top="15" backgroundColor="white" left="20" fontSize="16" class="input"></Label>    
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
            translate: { x: -5, y: - 20 },
            scale: { x: 0.8, y: 0.8}
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
