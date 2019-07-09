import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  username: string;
  password: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private dataService:DataService,
      //private alertService: AlertService
      ) { }

  ngOnInit() {
     // reset login status
     this.dataService.logout();

     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    let allow=this.dataService.isLoggedIn(this.username, this.password);
    this.loading = false;
     console.log("------------>",allow);

     if(allow){
      this.router.navigate(['/admin']);
     }
     else{
      alert("you dont have admin perrmissions")
     }
     /*  .subscribe(
            data => {
              console.log(data);
                this.router.navigate(['/admin']);
            },
            error => {
               // this.alertService.error(error);
                this.loading = false;
                
            }); */
        }
      
}







