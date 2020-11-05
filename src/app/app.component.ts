import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'Angular DEMO';
  blockedUI = false;

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  mostrarMensajeError(mensajito: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'ADVERTENCIA',
      detail: mensajito,
    });
  }

  mostrarMensajeExito(mensajito: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'ÉXITO',
      detail: mensajito,
    });
  }

  /**
   * Este método bloquea toda la ventana evitando que el usuario pueda realizar una sobrecarga de acciones.
   */
  bloquearVentana(): void {
    this.blockedUI = true;
    this.changeDetector.detectChanges();
  }

  /**
   * Este método desbloquea la ventana para que el usuario pueda continuar con su trabajo.
   * Usarlo de preferencia en los métodos de error o completado (complete).
   */
  desbloquearVentana(): void {
    this.blockedUI = false;
    this.changeDetector.detectChanges();
  }
}
