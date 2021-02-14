using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ACUHelpdesk.Models;

namespace ACUHelpdesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NegotiationProductController : ControllerBase
    {
        private readonly ACUContext _context;

        public NegotiationProductController(ACUContext context)
        {
            _context = context;
        }

        // GET: api/NegotiationProduct
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NegotiationProduct>>> GetNegotiationProducts()
        {
            return await _context.NegotiationProducts.ToListAsync();
        }

        // GET: api/NegotiationProduct/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NegotiationProduct>> GetNegotiationProduct(int id)
        {
            var negotiationProduct = await _context.NegotiationProducts.FindAsync(id);

            if (negotiationProduct == null)
            {
                return NotFound();
            }

            return negotiationProduct;
        }

        // PUT: api/NegotiationProduct/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiationProduct(int id, NegotiationProduct negotiationProduct)
        {
            if (id != negotiationProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(negotiationProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NegotiationProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/NegotiationProduct
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NegotiationProduct>> PostNegotiationProduct(NegotiationProduct negotiationProduct)
        {
            _context.NegotiationProducts.Add(negotiationProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNegotiationProduct", new { id = negotiationProduct.Id }, negotiationProduct);
        }

        // DELETE: api/NegotiationProduct/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNegotiationProduct(int id)
        {
            var negotiationProduct = await _context.NegotiationProducts.FindAsync(id);
            if (negotiationProduct == null)
            {
                return NotFound();
            }

            _context.NegotiationProducts.Remove(negotiationProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NegotiationProductExists(int id)
        {
            return _context.NegotiationProducts.Any(e => e.Id == id);
        }
    }
}
