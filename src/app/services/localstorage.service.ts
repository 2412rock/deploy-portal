import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private isLocalVar = "islocal";

  constructor() { }

  public setLocal(){
    localStorage.setItem(this.isLocalVar, "true");
  }

  public setGCP(){
    localStorage.removeItem(this.isLocalVar);
  }

  public isLocal(): boolean{
    return localStorage.getItem(this.isLocalVar) === "true";
  }

}
