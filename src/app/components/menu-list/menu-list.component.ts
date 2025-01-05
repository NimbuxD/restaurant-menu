import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CurrencyPipe } from '@angular/common';
import { IMenuItem } from '../../interfaces/menu-item.interface';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormatPricePipe } from "../../pipes/format-price.pipe";

@Component({
  selector: 'app-menu-list',
  imports: [RouterModule, FormatPricePipe],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent  implements OnInit {
  menuItems: IMenuItem[] = [];

  constructor(private menuService: MenuService, public authService: AuthService) {}

  async ngOnInit() {
    try {
      this.menuItems = await this.menuService.getMenu();
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  }

  async deleteMenuItem(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      try {
        await this.menuService.deleteMenuItem(id);
        this.menuItems = this.menuItems.filter((item) => item.id !== id);
        alert('Elemento eliminado exitosamente');
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  }
}
