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
            Saved = 1,
            Initiated = 2,
            InProgress = 3,
            OnHold = 4,
            Completed = 5,
            Cancelled = 6
        }

        public enum MemberStatus
        {
            Approved = 1,
            Rejected = 2,
            Pending = 3
        }
    }
}
