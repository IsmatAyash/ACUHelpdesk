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
    public class NegotiationDiscussionController : ControllerBase
    {
        private readonly ACUContext _context;

        public NegotiationDiscussionController(ACUContext context)
        {
            _context = context;
        }

        // GET: api/NegotiationDiscussion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NegotiationDiscussion>>> GetNegotiationDiscussions()
        {
            return await _context.NegotiationDiscussions.ToListAsync();
        }

        // GET: api/NegotiationDiscussion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NegotiationDiscussion>> GetNegotiationDiscussion(int id)
        {
            var negotiationDiscussion = await _context.NegotiationDiscussions.FindAsync(id);

            if (negotiationDiscussion == null)
            {
                return NotFound();
            }

            return negotiationDiscussion;
        }

        // PUT: api/NegotiationDiscussion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiationDiscussion(int id, NegotiationDiscussion negotiationDiscussion)
        {
            if (id != negotiationDiscussion.Id)
            {
                return BadRequest();
            }

            _context.Entry(negotiationDiscussion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NegotiationDiscussionExists(id))
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

        // POST: api/NegotiationDiscussion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NegotiationDiscussion>> PostNegotiationDiscussion(NegotiationDiscussion negotiationDiscussion)
        {
            _context.NegotiationDiscussions.Add(negotiationDiscussion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNegotiationDiscussion", new { id = negotiationDiscussion.Id }, negotiationDiscussion);
        }

        // DELETE: api/NegotiationDiscussion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNegotiationDiscussion(int id)
        {
            var negotiationDiscussion = await _context.NegotiationDiscussions.FindAsync(id);
            if (negotiationDiscussion == null)
            {
                return NotFound();
            }

            _context.NegotiationDiscussions.Remove(negotiationDiscussion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NegotiationDiscussionExists(int id)
        {
            return _context.NegotiationDiscussions.Any(e => e.Id == id);
        }
    }
}
