using ACUHelpdesk.Hubs;
using ACUHelpdesk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ACUHelpdesk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NegController : Controller
    {
        private IHubContext<NegHub> _neg;
        private readonly ACUContext _ctx;


        public NegController(IHubContext<NegHub> neg, ACUContext ctx)
        {
            _neg = neg;
            _ctx = ctx;
        }

        [HttpPost("[action]/{connId}/{negId}")]
        public async Task<IActionResult> JoinNeg(string connId, string negId)
        {
            await _neg.Groups.AddToGroupAsync(connId, negId);
            return Ok();
        }

        [HttpPost("[action]/{connId}/{negId}")]
        public async Task<IActionResult> LeaveNeg(string connId, string negName)
        {
            await _neg.Groups.RemoveFromGroupAsync(connId, negName);
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> SendMessage(NegotiationDiscussion message)
        {
            message.SentAt = DateTime.Now;
            _ctx.NegotiationDiscussions.Add(message);
            await _ctx.SaveChangesAsync();

            //await _neg.Clients.All.SendAsync("ReceivedMessage", message);

            await _neg.Clients.Group(message.NegotiationId.ToString())
                              .SendAsync("ReceivedMessage", message);
            return Ok();
        }


    }
}
