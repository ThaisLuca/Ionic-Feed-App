let config_name = "config"

import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }


  constructor() {
    
  }

  getConfigData():any{
    return localStorage.getItem(config_name);
  }

  setConfigData(showSlide?:boolean, name?:string, username?:string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    }

    if(showSlide){
      config.showSlide = showSlide;
    }

    if(name){
      config.name = name;
    }

    if(username){
      config.username = username;
    }

    localStorage.setItem(config_name, JSON.stringify(config));
  }

}
