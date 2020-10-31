import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'angular01';

  constructor(
    private messageService: MessageService
  ){}


  mostrarMensajeError(mensajito: string){
    this.messageService.add({severity:'warn', summary:'ADVERTENCIA', detail: mensajito});
  }
  
}
