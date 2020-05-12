import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  profile() {
    this.username = this.authService.getUserName();
    this.router.navigate(['/user/', this.username]);
  }
}
