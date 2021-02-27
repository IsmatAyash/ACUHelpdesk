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
    public class MemberController : ControllerBase
    {
        private readonly ACUContext _context;

        public MemberController(ACUContext context)
        {
            _context = context;
        }

        // GET: api/Member
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NegotiationMember>>> GetNegotiationMembers()
        {
            return await _context.NegotiationMembers.ToListAsync();
        }

        // GET: api/Member/5
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

        // PUT: api/Member/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNegotiationMember(int id, NegotiationMember member)
        {
            try
            {
                if (member == null)
                {
                    return BadRequest(new { message = "Member data sent to server was null" });
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid model object" });
                }
                var negMember = await _context.NegotiationMembers
                                        .SingleOrDefaultAsync(n => n.Id == id);
                if (negMember == null)
                {
                    return NotFound();
                }

                negMember.MemberStatus = member.MemberStatus;
                negMember.ActionAt = member.ActionAt;
                negMember.isLeader = member.isLeader;
                negMember.OnlineStatus = member.OnlineStatus;

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Member
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NegotiationMember>> PostNegotiationMember(NegotiationMember negotiationMember)
        {
            _context.NegotiationMembers.Add(negotiationMember);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNegotiationMember", new { id = negotiationMember.Id }, negotiationMember);
        }

        // DELETE: api/Member/5
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
