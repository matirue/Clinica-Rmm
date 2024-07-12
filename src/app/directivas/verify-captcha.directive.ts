import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVerifyCaptcha]'
})
export class VerifyCaptchaDirective {

  @Input() targetImage: { src: string, description: string };
  @Input() selectedImage: { src: string, description: string };
  @Output() verificationResult = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick() {
    const isVerified = this.selectedImage === this.targetImage;
    this.verificationResult.emit(isVerified);
    if (isVerified) {
      this.renderer.addClass(this.el.nativeElement, 'verified');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'verified');
    }
  }

}
