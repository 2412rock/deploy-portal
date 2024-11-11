import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    
  }

  deployLocalServer(req: DeployReq){
    return this.http.post<any>(`http://10.244.17.97/api/deploy`, req)
  }

  deployGCPServer(req: DeployReq){
    return this.http.post<any>(`http://10.244.216.141/api/deploy`, req)
  }

  deployMigrations(){
    let req = new DeployReq();
    req.deploy_migrations = true;
    return this.http.post<any>(`http://10.244.225.232/api/deploy`, req)
  }
}

export class DeployReq{
  public password: string = localStorage.getItem('password') as string;
  public deploy_backend: boolean = false;
  public deploy_sql: boolean = false;
  public deploy_migrations: boolean = false;
  public deploy_bot: boolean = false;
}
