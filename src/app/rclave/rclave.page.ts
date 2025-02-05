import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../service/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
  standalone: false
})
export class RclavePage implements OnInit {
  nuevaClave: any;
  mostrarCambioClave: any;
  pregunta: any;
  usuario: any;
  respuesta: any;

  constructor(private servicio: AccesoService,
        private navCtrl: NavController,
    
  ) { } // Inyecta el servicio en el constructor

  ngOnInit() {}

  verificarUsuario() {
    const datos = {
      accion: 'preguntaSeguridad',  // Acción para obtener la pregunta de seguridad
      ci: this.usuario               // El CI del usuario
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        // Si la pregunta existe, mostrarla
        this.pregunta = res.pregunta;
      } else {
        // Si no hay pregunta
        this.servicio.showToast(res.mensaje, 2000);
      }
    });
  }

  verificarRespuesta() {
    const datos = {
      accion: 'verificarRespuestaSeguridad',  // Acción para verificar la respuesta
      ci: this.usuario,                       // El CI del usuario
      respuesta: this.respuesta               // La respuesta proporcionada
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        // Si la respuesta es correcta, mostrar el input para la nueva clave
        this.mostrarCambioClave = true;
        this.servicio.showToast(res.mensaje, 2000);
      } else {
        // Si la respuesta es incorrecta
        this.servicio.showToast(res.mensaje, 2000);
      }
    });
  }

  async cambiarClave() {
    const id = this.usuario;
    const datos = {
      accion: 'cambiarClave',  
      id: id,
      clave: this.nuevaClave
    };
    console.log(datos);
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        // Si el cambio de clave es exitoso
        this.servicio.showToast("Clave cambiada con éxito", 2000);
      } else {
        // Si el cambio de clave falla
        this.servicio.showToast(res.mensaje, 2000);
        console.log(res.mensaje);
      }

    });
    this.navCtrl.navigateBack("/home");

  }
}
