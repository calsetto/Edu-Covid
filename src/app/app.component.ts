import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { JsonService } from './json.service'
import { User } from './user.model';
import { AuthService } from './auth.service';
import { NewLocationService } from "./new-location.service"
import { locatModel } from './location.model';

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

  //AGREGANDO LOS NUEVOS CASOS AL MAPA======================================================================

  mapDblClick(event){
    //console.log(event.coords.lat, event.coords.lng)
    if(confirm('Estas seguro que quieres agregar un caso de COVID-19 en esta ubicacion?')){
      
      this.locationService.addLocat({
        lat: event.coords.lat,
        lng: event.coords.lng
      });
    }
    
  }

  //========================================================================================================

  //ELIMINANDO LOS NUEVOS CASOS DEL MAPA====================================================================

  deleteLocat(locat){
    if(confirm('Estas seguro de eliminar este nuevo caso de COVID-19?')){

      this.locationService.deleteLocat(locat);
    }  
  }

  //CONSUMIENDO LA API Y OBTENIENDO CURRENTLOCATION=========================================================
  user$: User[];

  constructor(private dataService: JsonService, public auth: AuthService, public locationService: NewLocationService){
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }
  locat: locatModel[];
  ngOnInit(){

    this.locat = this.locationService.getLocat();

    return this.dataService.getJson()
    .subscribe(data => this.user$ = data)

  }

  


}
