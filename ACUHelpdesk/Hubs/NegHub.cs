using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Hubs
{
    public class NegHub : Hub
    {
        public string GetConnId() => Context.ConnectionId;
    }
}
