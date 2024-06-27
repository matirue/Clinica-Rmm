import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRoundDiv]'
})
export class RoundDivDirective {

  @Input() appRoundDiv: string;

  constructor(
   private elmRef: ElementRef, 
   private renderer: Renderer2) 
  {
    
   }

  ngOnInit() {
    
    let roundVal = `${this.appRoundDiv}`;
    this.renderer.setStyle(this.elmRef.nativeElement, 'border-radius', '50%');
    console.log(roundVal)
    
  }

}
