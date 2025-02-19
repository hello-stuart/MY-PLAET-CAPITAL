import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true
})
export class HeaderComponent {

  isScrolled = false;

  isNavbarCollapsed = true;

  @HostListener('document:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Change color when scrolling down 50px
  }
}
