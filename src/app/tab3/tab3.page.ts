import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHandlerService } from '../services/jwt-handler.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  

  constructor(private router: Router, private jwtService:JwtHandlerService) {}

  //Método para cerrar sesión.
  logout(){
    this.jwtService.deleteJWT();
    this.router.navigateByUrl("/login");
  }

}
