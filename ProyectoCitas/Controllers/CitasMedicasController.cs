using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCitas.Models;

namespace ProyectoCitas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitasMedicasController : ControllerBase
    {
        private readonly DbcitasMedicasContext _dbcontext;

        public CitasMedicasController(DbcitasMedicasContext context)
        {

            _dbcontext = context;
        }

        [HttpGet]
        [Route("ListaCita")]
        public async Task<IActionResult> ListaCita()
        {
            try {
                List<Cita> listaCitasMedicas = await _dbcontext.Citas.Include( c => c.Doctor).Include( c => c.Contacto).ToListAsync();

                return StatusCode(StatusCodes.Status200OK, listaCitasMedicas);
            }
            catch(Exception ex) { 
              return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
            
        }

        [HttpPost]
        [Route("GuardarCita")]
        public async Task<IActionResult> GuardarCita([FromBody] Cita request)
        {
            Console.WriteLine(request);
            var response = await _dbcontext.Citas.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("EditarCita")]
        public async Task<IActionResult> EditarCita([FromBody] Cita request)
        {
            _dbcontext.Citas.Update(request);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("EliminarCita/{id:decimal}")]
        public async Task<IActionResult> EliminarCita(decimal id)
        {
#pragma warning disable CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL
            var cita = _dbcontext.Citas.Find(id);
#pragma warning restore CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL

            _dbcontext.Citas.Remove(cita);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
