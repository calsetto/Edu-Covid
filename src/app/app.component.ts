import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { JsonService } from './json.service'
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
//PROPIEDADES DEL MAPA====================================================================================
  lat: any;
  lng: any;
  icon={
    url: 'https://image.flaticon.com/icons/svg/2713/2713295.svg',
    scaledSize: {
      width: 30, height:30
    }
  };

  me={
    url: 'https://image.flaticon.com/icons/svg/2716/2716293.svg',
    scaledSize: {
      width: 20, height:20
    }
  };

  zoom: number = 4;

  //=======================================================================================================

  //ANADIR INFORMACION A LOS MARKER========================================================================
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

  //========================================================================================================

  //CONSUMIENDO LA API Y OBTENIENDO CURRENTLOCATION=========================================================
  user$: User[];

  constructor(private dataService: JsonService, public auth: AuthService){
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
