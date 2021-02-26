﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ACUHelpdesk.Models;
using ACUHelpdesk.Services;

namespace ACUHelpdesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NegotiationController : ControllerBase
    {
        private readonly ACUContext _context;
        private readonly IEmailService _emailService;


        public NegotiationController(ACUContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
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
                                         Avatar = String.IsNullOrEmpty(m.User.Avatar)
                                                  ? "/images/avatarPlaceholder.png"
                                                  : string.Format("{0}://{1}{2}/Content/Avatars/{3}", Request.Scheme, Request.Host, Request.PathBase, m.User.Avatar),
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
                                         Avatar = String.IsNullOrEmpty(m.User.Avatar) 
                                                  ? "/images/avatarPlaceholder.png"
                                                  : string.Format("{0}://{1}{2}/Content/Avatars/{3}", Request.Scheme, Request.Host, Request.PathBase, m.User.Avatar),
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
                var negEntity = await _context.Negotiations
                                        .Include(m => m.NegotiationMembers)
                                        .Include(p => p.NegotiationProducts)
                                        .SingleOrDefaultAsync(n => n.Id == id);
                if (negEntity == null)
                {
                    return NotFound();
                }

                negEntity.UserId = negotiation.UserId;
                negEntity.NegName = negotiation.NegName;
                negEntity.NegSubject = negotiation.NegSubject;
                negEntity.NegCreatedAt = negotiation.NegCreatedAt;
                negEntity.NegInitiatedAt = negotiation.NegInitiatedAt;
                negEntity.NegotiationProducts = negotiation.NegotiationProducts;
                negEntity.NegotiationMembers = negotiation.NegotiationMembers;

                await _context.SaveChangesAsync();

                return Ok();
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

            sendNegPasscodeEmail(negotiation.NegSubject, negotiation.NegName, "PassCode", "ismat.ayash@icloud.com" , Request.Headers["origin"]);

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

        private void sendNegPasscodeEmail(string subject, string title, string passcode, string emails, string origin)
        {
            var acceptUrl = $"{origin}/accept-negotiation";
            var rejectUrl = $"{origin}/reject-negotiation";
            string message;
            message = $@"<p>تفضلوا بقبول أو رفض الحوار تحت العنوان {title} حول {subject} </p>
            <p>في حال قبول الدعوى للحوار، أدخل كلمة السر المرفقة لتفعيل هذه الدعوة </p>
            <p><code>{passcode}</code></p>
            <pre><a href=""{acceptUrl}""><h3>قبول الدعوة</h3></a> <a href=""{rejectUrl}""><h3>رفض الدعوة</h3></a></pre>";

            _emailService.Send(
                to: emails,
                subject: "منصة الحوار عبر ACUHelpdesk",
                html: $@"<h2>كلمة السر الخاصة بهذا الحوار</h2>
                         {message}"
            );
        }

        private bool NegotiationExists(int id)
        {
            return _context.Negotiations.Any(e => e.Id == id);
        }

    }
}
