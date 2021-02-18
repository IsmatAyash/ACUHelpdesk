using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Helpers
{
    public class GlobalHelpers
    {
        public enum MessageType
        {
            Text = 1,
            Image = 2,
            PDF = 3,
            Word = 4
        }

        public enum NegotiationStatus
        { 
            Pending = 1,
            Active = 2,
            Completed = 3,
            Cancelled = 4
        }

        public enum MemberStatus
        {
            Approved = 1,
            Rejected = 2,
            Pending = 3
        }
    }
}
