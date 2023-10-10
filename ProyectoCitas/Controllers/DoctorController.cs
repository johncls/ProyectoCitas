using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCitas.Models;

namespace ProyectoCitas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController :ControllerBase
    {
        private readonly DbcitasMedicasContext _dbcontext;

        public DoctorController(DbcitasMedicasContext context)
        {

            _dbcontext = context;
        }

        [HttpGet]
        [Route("ListaDoctor")]
        public async Task<IActionResult> ListaDoctor()
        {
            List<Doctor> listaContacto = await _dbcontext.Doctors.OrderByDescending(c => c.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, listaContacto);
        }

        [HttpPost]
        [Route("GuardarDoctor")]
        public async Task<IActionResult> GuardarDoctor([FromBody] Doctor request)
        {
            
            await _dbcontext.Doctors.AddAsync(request);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("EditarDoctor")]
        public async Task<IActionResult> EditarDoctor([FromBody] Doctor request)
        {
            _dbcontext.Doctors.Update(request);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("EliminarDoctor/{id:decimal}")]
        public async Task<IActionResult> EliminarDoctor(decimal id)
        {
#pragma warning disable CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL
            var doctor = _dbcontext.Doctors.Find(id);
#pragma warning restore CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL

            _dbcontext.Doctors.Remove(doctor);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
