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
        public async Task<ActionResult<IEnumerable<NegotiationProduct>>> GetNegotiationProducts(int id)
        {
            var negProds = await _context.NegotiationProducts
                                         .Include(p => p.Product)
                                         .Where(np => np.NegotiationId == id)
                                         .Select(x => new
                                         {
                                             x.Id,
                                             x.Product.ProductDescriptionAR,
                                             x.Tariff,
                                             x.Remarks,
                                             x.ProductId
                                         }).ToListAsync();
            return Ok(negProds);
        }

        // PUT: api/NegotiationProduct/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiationProduct(int id, List<NegotiationProduct> model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest(new { message = "Member data sent to server was null" });
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid model object" });
                }
                var negotiationProducts = await _context.NegotiationProducts.Where(np => np.NegotiationId == id).ToListAsync();
                if (negotiationProducts == null)
                {
                    return NotFound();
                }

                var index = -1;
                foreach(var pp in model)
                {
                    index = negotiationProducts.FindIndex(np => np.Id == pp.Id);
                    if (index != -1)
                    {
                        negotiationProducts[index].Tariff = pp.Tariff;
                        negotiationProducts[index].Remarks = pp.Remarks;
                    }
                }
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
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
