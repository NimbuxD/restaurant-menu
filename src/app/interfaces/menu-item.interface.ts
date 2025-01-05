export interface IMenuItem {
    id: number;           // Identificador único
    name: string;         // Nombre del plato
    description?: string; // Descripción (opcional)
    price: number;        // Precio del plato
    color?: string;       // Color de fondo (opcional)
    image?: string;       // URL de la imagen (opcional)
    position?: number;    // Posición en el menú (opcional)
}
