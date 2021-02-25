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
    public class NegotiationController : ControllerBase
    {
        private readonly ACUContext _context;

        public NegotiationController(ACUContext context)
        {
            _context = context;
        }

        // GET: api/Negotiation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Negotiation>>> GetNegotiations()
        {
            var negotiations = await _context.Negotiations
                                 .Include(u => u.User)
                                 .ThenInclude(c => c.Country)
                                 .Include(p => p.NegotiationProducts)
                                 .ThenInclude(p => p.Product)
                                 .Include(nm => nm.NegotiationMembers)
                                 .ThenInclude(m => m.User)
                                 .AsNoTracking()
                                 .Select(r => new 
                                 { 
                                     r.Id,
                                     r.NegSubject,
                                     r.NegStatus,
                                     r.NegCreatedAt,
                                     r.NegName,
                                     r.NegInitiatedAt,
                                     NegCreatedBy = r.User.FirstName + " " + r.User.LastName,
                                     Members = r.NegotiationMembers.Select(m => new 
                                     { 
                                         MemberId = m.UserId, 
                                         MemberName = m.User.FirstName + ' ' + m.User.LastName, 
                                         Avatar = string.Format("{0}://{1}{2}/Content/Avatars/{3}", Request.Scheme, Request.Host, Request.PathBase, m.User.Avatar),
                                         m.MemberStatus, 
                                         m.isLeader, 
                                         m.OnlineStatus,
                                         Flag = m.User.Country.Alpha2
                                     }),
                                     Products = r.NegotiationProducts.Select(p => new {ProductId = p.Id, p.Product.ProductDescriptionAR, p.Product.ProductCode})
                                 }).ToListAsync();

            return Ok(negotiations);
        }

        // GET: api/Negotiation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Negotiation>> GetNegotiation(int id)
        {
            var negotiation = await _context.Negotiations
                                 .Where(n => n.Id == id)
                                 .Include(u => u.User)
                                 .ThenInclude(c => c.Country)
                                 .Include(p => p.NegotiationProducts)
                                 .ThenInclude(p => p.Product)
                                 .Include(nm => nm.NegotiationMembers)
                                 .ThenInclude(m => m.User)
                                 .AsNoTracking()
                                 .Select(r => new
                                 {
                                     r.Id,
                                     r.NegSubject,
                                     r.NegStatus,
                                     r.NegCreatedAt,
                                     r.NegName,
                                     r.NegInitiatedAt,
                                     NegCreatedBy = r.User.FirstName + " " + r.User.LastName,
                                     Members = r.NegotiationMembers.Select(m => new
                                     {
                                         MemberId = m.UserId,
                                         MemberName = m.User.FirstName + ' ' + m.User.LastName,
                                         Avatar = string.Format("{0}://{1}{2}/Content/Avatars/{3}", Request.Scheme, Request.Host, Request.PathBase, m.User.Avatar),
                                         m.MemberStatus,
                                         m.isLeader,
                                         m.OnlineStatus,
                                         Flag = m.User.Country.Alpha2
                                     }),
                                     Products = r.NegotiationProducts.Select(p => new { ProductId = p.Id, p.Product.ProductDescriptionAR, p.Product.ProductCode })
                                 }).ToListAsync();

            if (negotiation == null)
            {
                return NotFound();
            }

            return Ok(negotiation);
        }

        // PUT: api/Negotiation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiation(int id, Negotiation negotiation)
        {
            try
            {
                if (negotiation == null)
                {
                    return BadRequest(new { message = "Negotiation data sent to server was null" });
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid model object" });
                }
                var negEntity = _context.Negotiations.FirstOrDefaultAsync(n => n.Id == id);
                if (negEntity == null)
                {
                    return NotFound();
                }

                var members = _context.NegotiationMembers.Where(m => m.NegotiationId == id);
                _context.NegotiationMembers.RemoveRange(members);
                var products = _context.NegotiationProducts.Where(p => p.NegotiationId == id);
                _context.NegotiationProducts.RemoveRange(products);

                _context.Entry(negotiation).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Negotiation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Negotiation>> PostNegotiation(Negotiation negotiation)
        {
            if (negotiation == null)
            {
                return BadRequest(new { message = "Http Request mistake please check" }); ;
            }

            try
            {
                negotiation.NegStatus = "Pending";
                negotiation.NegCreatedAt = DateTime.Now;
                await _context.Negotiations.AddAsync(negotiation);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return CreatedAtAction(nameof(GetNegotiation), new { id = negotiation.Id }, negotiation);
        }

        // DELETE: api/Negotiation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNegotiation(int id)
        {
            var negotiation = await _context.Negotiations.FindAsync(id);
            if (negotiation == null)
            {
                return NotFound();
            }

            _context.Negotiations.Remove(negotiation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NegotiationExists(int id)
        {
            return _context.Negotiations.Any(e => e.Id == id);
        }
    }
}
