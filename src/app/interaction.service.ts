import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor() { }

  private messageSrc=new Subject<string>();
  category$=this.messageSrc.asObservable();

  sendMessage(message:string)
  {
    console.log("interaction",message)
    //const jsonmsg=JSON.parse(message)
    this.messageSrc.next(message);
  }

 
}
