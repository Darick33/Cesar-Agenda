import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../service/acceso.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
cancelar() {
  this.navCtrl.back();

}
  perfil = {
    codigo: '',
    ci: '',
    nombre: '',
    apellido: '',
    correo: '',
  };

  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService
  ) {}

  async ngOnInit() {
    const id = await this.servicio.getSession("idpersona") || '';

    let datos = {
      accion: 'datosPerfil',
      id: id
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.perfil = res.persona;
        console.log(res.persona)
      } else {
        this.servicio.showToast(res.mensaje, 2000);
      }
    });
  }

  actualizarPerfil() {
    let datos = {
      accion: 'actualizarPerfil',
      id: this.perfil.codigo,
      nombre: this.perfil.nombre,
      apellido: this.perfil.apellido,
      correo: this.perfil.correo
      
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast("Actualizacion Completada", 2000);
      this.navCtrl.navigateBack("/menu");

      } else {
        this.servicio.showToast(res.mensaje, 2000);
      }
    });
  }

  verPerfil() {
    this.navCtrl.navigateForward("/perfil");
  }

  cerrarSesion() {
    this.servicio.closeSession().then(() => {
      this.navCtrl.navigateBack("/home");
    });
  }
}
