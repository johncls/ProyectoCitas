using System;
using System.Collections.Generic;

namespace ProyectoCitas.Models;

public partial class Cita
{
    public decimal Id { get; set; }

    public string? Nombre { get; set; }

    public string? Direccion { get; set; }

    public DateTime? FechaConsulta { get; set; }

    public decimal? IdPaciente { get; set; }

    public decimal? IdDoctor { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public virtual Doctor? IdDoctorNavigation { get; set; }

    public virtual Contacto? IdPacienteNavigation { get; set; }
}
