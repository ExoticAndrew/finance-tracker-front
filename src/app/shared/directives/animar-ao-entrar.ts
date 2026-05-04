import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimarAoEntrar]',
})
export class AnimarAoEntrar implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const elemento = this.el.nativeElement;

    elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
          } else {
            // reseta quando sai da tela
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(30px)';
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(elemento);
  }
}