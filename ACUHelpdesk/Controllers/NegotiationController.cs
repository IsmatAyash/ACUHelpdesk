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
                                         MemberId = m.Id, 
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
            var negotiation = await _context.Negotiations.FindAsync(id);

            if (negotiation == null)
            {
                return NotFound();
            }

            return negotiation;
        }

        // PUT: api/Negotiation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiation(int id, Negotiation negotiation)
        {
            if (id != negotiation.Id)
            {
                return BadRequest();
            }

            _context.Entry(negotiation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NegotiationExists(id))
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

        // POST: api/Negotiation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Negotiation>> PostNegotiation(Negotiation negotiation)
        {
            if (negotiation == null)
            {
                return BadRequest(new { message = "Http Request mistake please check" }); ;
            }

            using var transaction = _context.Database.BeginTransaction();

            //try
            //{
                negotiation.NegStatus = "Pending";
                _context.Negotiations.Add(negotiation);
                await _context.SaveChangesAsync();
                foreach ( var product in negotiation.NegotiationProducts)
                {
                    NegotiationProduct NegProd = new NegotiationProduct();
                    NegProd.ProductId = product.ProductId;
                    NegProd.NegotiationId = negotiation.Id;
                    _context.NegotiationProducts.Add(NegProd);
                }
                await _context.SaveChangesAsync();


            foreach (var member in negotiation.NegotiationMembers)
                {
                    NegotiationMember NegMemb = new NegotiationMember();
                    NegMemb.UserId = member.UserId;
                    NegMemb.NegotiationId = negotiation.Id;
                    NegMemb.isLeader = false;
                    NegMemb.OnlineStatus = false;
                    NegMemb.MemberStatus = "Pending";
                    NegMemb.ActionAt = null;
                    _context.NegotiationMembers.Add(NegMemb);
                }
                await _context.SaveChangesAsync();


            // Commit transaction if all commands succeed, transaction will auto-rollback
            // when disposed if either commands fails
            transaction.Commit();
            //}
            //catch (Exception)
            //{
            //    return BadRequest(new { message = "Something went wrong. Data was not saved" });
            //}

            return CreatedAtAction("GetNegotiation", new { id = negotiation.Id }, negotiation);
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
