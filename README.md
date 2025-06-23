# Salones Spider-Kitty - Sistema de Gestión de Eventos

## Descripción General
El sistema de administración **Salones Spider-Kitty** proporciona una solución integral para la gestión de espacios destinados a fiestas infantiles. Esta plataforma permite el control centralizado de los recursos disponibles, facilitando las operaciones administrativas mediante una interfaz intuitiva.

## Características Técnicas

### Stack Tecnológico
| Componente       | Tecnología                |
|------------------|---------------------------|
| Frontend         | HTML5, CSS3, JavaScript (ES6+) |
| Framework        | Bootstrap 5               |
| Iconografía      | Font Awesome 6            |
| Tipografía       | Google Fonts (Inter)      |
| Almacenamiento   | LocalStorage (persistencia de datos) |

## Manual de Operación

### Funcionalidades Principales

#### 1. Registro de Nuevos Salones
1. Acceder al panel de administración
2. Seleccionar la opción **"Nuevo Salón"**
3. Completar el formulario con:
   - Nombre del espacio (campo obligatorio)
   - Tarifa por uso (valor numérico)
   - Aforo máximo (en personas)
   - Archivo visual (formatos admitidos: JPG, PNG, GIF)
4. Confirmar mediante el botón **"Guardar"**

#### 2. Modificación de Registros Existentes
1. Localizar el salón en el listado
2. Seleccionar el ícono de edición (✏️)
3. Actualizar los campos requeridos
4. Validar los cambios

#### 3. Eliminación de Espacios
1. Identificar el registro a eliminar
2. Activar el ícono correspondiente (🗑️)
3. Verificar la acción en el cuadro de diálogo emergente

### Módulo de Consulta Pública
- Visualización del inventario disponible
- Acceso a información institucional
- Canal de comunicación directa

## Aspectos Técnicos Relevantes

### Consideraciones de Implementación
- Los datos persisten únicamente en el navegador del usuario (LocalStorage)
- La carga de imágenes funciona mediante vista previa local


### Nuevas funcionalidades agregadas en la entrega final

#### Gestión de Servicios
- Se implementó un panel de administración donde se pueden **crear, editar y eliminar** servicios ofrecidos por los salones.
- Cada servicio incluye una **descripción** y un **valor monetario**.
- Los datos se almacenan en `localStorage` y se precargan desde un archivo `data/servicios.json` si no hay datos previos.
- Interfaz desarrollada con Bootstrap, responsive y consistente con el diseño del sistema.

#### Generador de Presupuestos
- Permite registrar presupuestos personalizados para clientes.
- Incluye campos de **nombre del cliente**, **fecha del evento**, **temática** y selección múltiple de servicios disponibles.
- Calcula automáticamente el total del presupuesto en base a los servicios elegidos.
- Los datos se almacenan en `localStorage`, con ejemplos cargados desde `data/presupuestos.json` si el almacenamiento está vacío.

#### Persistencia sin backend
- Para garantizar que los datos se visualicen en la demo en Netlify, se utilizan archivos `.json` públicos como fuente inicial.
- Luego, la información permanece guardada en el navegador mediante `localStorage`.

## Equipo de Desarrollo

**Integrantes:**  
Mariano Bustos
Laura Moyano
Ileana Nieto
Maximiliano Ortiz
---