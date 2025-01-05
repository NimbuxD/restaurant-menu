import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../interfaces/menu-item.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent {
  menuForm: FormGroup;
  isEditMode: boolean = false;
  menuItemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      color: ['#ffffff'],
      image: [''],
      position: [0],
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.menuItemId = +id;

        // Obtener datos del menú y prellenar el formulario
        const menuItem = await this.menuService.getMenuItem(this.menuItemId);
        if (menuItem) {
          this.menuForm.patchValue(menuItem);
        }
      }
    });
  }

  async onSubmit() {
    if (this.menuForm.valid) {
      try {
        if (this.isEditMode && this.menuItemId !== null) {
          // Editar elemento existente
          await this.menuService.updateMenuItem(this.menuItemId, this.menuForm.value);
          alert('Elemento actualizado exitosamente');
        } else {
          // Crear nuevo elemento
          await this.menuService.addMenuItem(this.menuForm.value);
          alert('Elemento agregado exitosamente');
        }
        this.router.navigate(['/menu-list']);
      } catch (error) {
        console.error('Error al guardar el elemento:', error);
      }
    }
  }
}
