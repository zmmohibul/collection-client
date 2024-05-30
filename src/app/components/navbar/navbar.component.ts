import {Component, signal} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showUserDropdown = signal<boolean>(false)

  constructor(public authService: AuthenticationService) {
  }

  userIconClick() {
    this.showUserDropdown.set(!this.showUserDropdown())
  }
}
