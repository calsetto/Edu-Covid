import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { JsonService } from './json.service'
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  lat: number = 43.653908;
  lng: number = -79.384293;
  icon={
    url: 'https://www.flaticon.com/premium-icon/icons/svg/2713/2713258.svg',
    scaledSize: {
      width: 20, height:20
    }
  };

  user$: User[];

  constructor(private dataService: JsonService){}

  ngOnInit(){

    return this.dataService.getJson()
    .subscribe(data => this.user$ = data)

  }

}
