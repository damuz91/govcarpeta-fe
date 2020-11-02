import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  citizens: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.citizens = []

    this.userService.getPublicContent().subscribe(
      data => {
        try{
          // this.content = JSON.parse(data);
          this.citizens = JSON.parse(data).citizens
        }catch(e){
          this.content = "Parsing error"
        }
      },
      err => {
        try{
          this.content = JSON.parse(err.error).message;
        }catch(e){
          this.content = "Parsing error"
        }
      }
    )
  }

}