using System;
using System.Collections.Generic;

namespace ProyectoCitas.Models;

public partial class Contacto
{
    public decimal Id { get; set; }

    public string? Nombre { get; set; }

    public string? Direccion { get; set; }

    public string? Telefono { get; set; }

    public string? Correo { get; set; }

    public string? Constraseña { get; set; }

    public string? Identificacion { get; set; }

    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();
}
