import {ContentChild, Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @ContentChild('dropdown') dropdownElement: ElementRef;

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    event.stopPropagation();
    this.dropdownElement.nativeElement.classList.toggle('show');
  }

  @HostListener('document:click', ['$event']) clickOutside(event: Event) {
    const clickedInside = this.dropdownElement.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.dropdownElement.nativeElement.classList.remove('show');
    }
  }
}
