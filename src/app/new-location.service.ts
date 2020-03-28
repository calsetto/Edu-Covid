import { Injectable } from '@angular/core';
import { locatModel } from './location.model'

@Injectable({
  providedIn: 'root'
})
export class NewLocationService {

  locat: locatModel[];
  constructor() { 
    this.locat = [];
  }

  getLocat(){
    if(localStorage.getItem('newLocation') === null){
      return this.locat
    }else{
      this.locat = JSON.parse(localStorage.getItem('newLocation'));
      return this.locat;
    }
    
  }

  addLocat(locat: locatModel){
    this.locat.push(locat)
    let locar: locatModel[] = [];
    if(localStorage.getItem('newLocation')=== null){

      locar.push(locat)
      localStorage.setItem('newLocation', JSON.stringify(locar));
    }else{
      locar = JSON.parse(localStorage.getItem('newLocation'));
      locar.push(locat);
      localStorage.setItem('newLocation', JSON.stringify(locar))
    }
    
  }

  deleteLocat(locat: locatModel){
    for(let i = 0; i < this.locat.length; i++ ){
      if(locat == this.locat[i]){
        this.locat.splice(i, 1);
        localStorage.setItem('newLocation', JSON.stringify(this.locat))
      }
    }
  }
}
