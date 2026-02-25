# Nellore Print Hub

## Current State

The Nellore Print Hub website is a Telugu-English bilingual printing services platform running on the Internet Computer. Current features include:

**Frontend:**
- Homepage with services showcase, features, and call-to-action sections
- Contact page with a simple form (name, phone, message fields)
- Admin page with Internet Identity authentication showing contact form submissions
- Telugu language toggle in navigation
- WhatsApp click-to-chat integration
- Business information display (phone: 919390535070, email: magic.nelloreprinthub@gmail.com, address link)

**Backend:**
- Contact form submission storage (name, phone number, message)
- Admin authorization system
- User profile management
- Contact message retrieval for admins

**Current Limitations:**
- Contact form does not collect customer email
- No quote request or quotation management system
- No services/deadline tracking for requests
- No messaging system between customer and business
- No share functionality for quotations
- No notification mechanism (email/WhatsApp are not available on the platform)

## Requested Changes (Diff)

### Add

**Quote Request System:**
- Customer email field in quote request form
- Services field to specify what printing services are needed
- Deadline field for when the customer needs the work completed
- Quote request storage in backend with all fields
- Admin view to see all quote requests with full details

**Quotation Management:**
- Admin ability to create and upload quotations for specific quote requests
- Quotation details (price, description, validity period)
- Link quotations to specific quote requests
- Share button for quotations (web share API or copy link)
- Customer ability to view their quotations

**Quote Acceptance:**
- Customer can accept or decline quotations
- Status tracking for quotations (pending, accepted, declined)
- Admin view of quotation status

**Messaging System:**
- Simple message exchange between customer and admin
- Message thread associated with quote requests
- Customer can send messages from the website
- Admin can view and respond to messages from admin panel
- WhatsApp click-to-chat link alongside website messaging

### Modify

- Contact page becomes "Request Quote" page with expanded form
- Admin panel displays quote requests instead of simple contact messages
- Admin panel adds new sections for quotation management and messaging

### Remove

- Simple contact form (replaced by quote request form)
- Basic contact messages table (replaced by quote request management)

## Implementation Plan

**Backend (Motoko):**
1. Create QuoteRequest type with fields: id, customerName, customerEmail, customerPhone, services, deadline, message, status, timestamp
2. Create Quotation type with fields: id, quoteRequestId, price, description, validUntil, status, createdAt
3. Create Message type with fields: id, quoteRequestId, sender (customer/admin), content, timestamp
4. Implement quote request submission (public, no auth required)
5. Implement quotation creation by admin (admin-only)
6. Implement quotation acceptance/decline by customer
7. Implement message sending (both directions)
8. Implement admin queries for all data

**Frontend:**
1. Update Contact page to Request Quote page with new fields (customer email, services, deadline)
2. Add quotation sharing functionality (Web Share API with fallback to copy link)
3. Create admin quotation management interface
4. Create customer quotation view page
5. Implement messaging interface in admin panel
6. Implement customer messaging interface
7. Add WhatsApp direct link integration throughout
8. Update Telugu translations for all new content
9. Add status badges and visual indicators for quote/quotation states

**Data Flow:**
- Customer submits quote request → stored in backend → admin sees in panel
- Admin creates quotation → customer can view via link → customer accepts/declines
- Customer/Admin exchange messages → both can see message thread
- All interactions logged but no automated notifications (manual check required)

## UX Notes

**For Customers:**
- Clear quote request form with all necessary fields
- Easy access to view quotations sent to them
- Simple accept/decline buttons on quotations
- Messaging interface to ask follow-up questions
- WhatsApp option available at every step for those who prefer it
- Share button to forward quotations to others

**For Admin:**
- Dashboard view of all pending quote requests
- Quick action to create quotation for a request
- Status tracking for all quotations
- Centralized messaging view
- Easy access to customer contact info for manual follow-up via phone/WhatsApp/email

**Notification Workaround:**
- Since automated email/WhatsApp/SMS notifications are not available, the admin must manually check the admin panel regularly
- Admin can manually contact customers via email (magic.nelloreprinthub@gmail.com) or WhatsApp (919390535070)
- Clear status indicators help admin track what needs attention
