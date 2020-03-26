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
  lat: any;
  lng: any;
  icon={
    url: 'https://www.flaticon.com/premium-icon/icons/svg/2713/2713258.svg',
    scaledSize: {
      width: 20, height:20
    }
  };

  lastSelectedWindow:any

  markerClick(infoWindow: any){
    if(infoWindow == this.lastSelectedWindow){
      return;
    }
    if(this.lastSelectedWindow != null){
      try{
        this.lastSelectedWindow.close();
      }catch{}
    }
    this.lastSelectedWindow = infoWindow;
  }

  user$: User[];

  constructor(private dataService: JsonService){
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit(){

    return this.dataService.getJson()
    .subscribe(data => this.user$ = data)

  }

}
