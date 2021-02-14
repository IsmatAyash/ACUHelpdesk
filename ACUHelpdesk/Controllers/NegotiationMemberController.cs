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
    public class NegotiationMemberController : ControllerBase
    {
        private readonly ACUContext _context;

        public NegotiationMemberController(ACUContext context)
        {
            _context = context;
        }

        // GET: api/NegotiationMember
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NegotiationMember>>> GetNegotiationMembers()
        {
            return await _context.NegotiationMembers.ToListAsync();
        }

        // GET: api/NegotiationMember/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NegotiationMember>> GetNegotiationMember(int id)
        {
            var negotiationMember = await _context.NegotiationMembers.FindAsync(id);

            if (negotiationMember == null)
            {
                return NotFound();
            }

            return negotiationMember;
        }

        // PUT: api/NegotiationMember/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiationMember(int id, NegotiationMember negotiationMember)
        {
            if (id != negotiationMember.Id)
            {
                return BadRequest();
            }

            _context.Entry(negotiationMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NegotiationMemberExists(id))
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

        // POST: api/NegotiationMember
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NegotiationMember>> PostNegotiationMember(NegotiationMember negotiationMember)
        {
            _context.NegotiationMembers.Add(negotiationMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNegotiationMember", new { id = negotiationMember.Id }, negotiationMember);
        }

        // DELETE: api/NegotiationMember/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNegotiationMember(int id)
        {
            var negotiationMember = await _context.NegotiationMembers.FindAsync(id);
            if (negotiationMember == null)
            {
                return NotFound();
            }

            _context.NegotiationMembers.Remove(negotiationMember);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NegotiationMemberExists(int id)
        {
            return _context.NegotiationMembers.Any(e => e.Id == id);
        }
    }
}
