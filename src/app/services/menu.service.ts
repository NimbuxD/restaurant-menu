import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { IMenuItem } from '../interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  async getMenu(): Promise<IMenuItem[]> {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
      throw new Error(error.message);
    }

    return data as IMenuItem[];
  }
  
  async getMenuItem(id: number): Promise<IMenuItem | null> {
    const { data, error } = await supabase.from('menu').select('*').eq('id', id).single();
  
    if (error) {
      console.error('Error fetching menu item:', error);
      return null;
    }
  
    return data as IMenuItem;
  }
  

  async addMenuItem(item: Omit<IMenuItem, 'id'>): Promise<void> {
    const { error } = await supabase.from('menu').insert([item]);

    if (error) {
      console.error('Error adding menu item:', error);
      throw new Error(error.message);
    }
  }

  async updateMenuItem(id: number, updatedItem: Partial<IMenuItem>): Promise<void> {
    const { error } = await supabase
      .from('menu')
      .update(updatedItem)
      .eq('id', id);

    if (error) {
      console.error('Error updating menu item:', error);
      throw new Error(error.message);
    }
  }

  async deleteMenuItem(id: number): Promise<void> {
    const { error } = await supabase
      .from('menu')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting menu item:', error);
      throw new Error(error.message);
    }
  }
}
