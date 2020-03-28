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
    url: '../assets/covi19.png',
    scaledSize: {
      width: 30, height:30
    }
  };

  me={
    url: '../assets/covi.png',
    scaledSize: {
      width: 30, height:30
    }
  };

  my={
    url: '../assets/here.png',
    scaledSize: {
      width: 30, height:30
    }
  };

  styles: any[] = [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "saturation": "-100"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 40
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#7f8d89"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 18
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 19
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#2b3638"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2b3638"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#24282b"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#24282b"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
  ]

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
