using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCitas.Models;

namespace ProyectoCitas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly DbcitasMedicasContext _dbcontext;

        public ContactoController(DbcitasMedicasContext context)
        {

            _dbcontext = context;
        }

        [HttpGet]
        [Route("ListaContacto")]
        public async Task<IActionResult> ListaContacto()
        {
            List<Contacto> listaContacto = await _dbcontext.Contactos.OrderByDescending(c => c.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, listaContacto);
        }

        [HttpGet]
        [Route("GetContacto")]
        public async Task<IActionResult> GetContacto()
        {
            var listaContacto = await _dbcontext.Contactos.OrderByDescending(c => c.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, listaContacto);
        }

        [HttpPost]
        [Route("GuardarContacto")]
        public async Task<IActionResult> GuardarContacto([FromBody] Contacto request)
        {
            Console.WriteLine(request);
            var response = await _dbcontext.Contactos.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("EditarContacto")]
        public async Task<IActionResult> EditarContacto([FromBody] Contacto request)
        {
            _dbcontext.Contactos.Update(request);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("EliminarContacto/{id:decimal}")]
        public async Task<IActionResult> EliminarContacto(decimal id)
        {
#pragma warning disable CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL
            var contacto =  _dbcontext.Contactos.Find(id);
#pragma warning restore CS8600 // Se va a convertir un literal nulo o un posible valor nulo en un tipo que no acepta valores NULL

            _dbcontext.Contactos.Remove(contacto);

            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
