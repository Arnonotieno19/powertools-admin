export const systemSettings={
  Business:{businessName:"ToolMart",supportEmail:"support@toolmart.co.ke",supportPhone:"+254 700 000 000",whatsappNumber:"254700000000",kraPin:"P051234567K",address:"Enterprise Road, Industrial Area",county:"Nairobi",country:"Kenya",currency:"KES",timezone:"Africa/Nairobi"},
  Commerce:{defaultVat:16,retailPricingEnabled:true,wholesaleEnabled:true,reviewsEnabled:true,wishlistEnabled:true,allowBackorders:false},
  Inventory:{defaultReorderLevel:8,allowNegativeStock:false,stockReservationTimeout:30,requireAdjustmentReason:true,requireGrnReference:true},
  Orders:{orderNumberPrefix:"TM",autoConfirmPaidOrders:true,allowCustomerCancellation:true,cancellationWindow:30,requireDispatchConfirmation:true},
  Payments:{mpesaEnabled:true,environment:"Sandbox",shortcode:"••••••••",callbackUrl:"https://api.example.com/payments/mpesa/callback"},
  Notifications:{orderConfirmation:true,paymentConfirmation:true,packedNotification:true,shippedNotification:true,deliveredNotification:true,lowStockAlert:true,wholesaleApplicationAlert:true,channels:["Email","SMS"]},
  Integrations:{"M-Pesa Daraja":"Configured","Email Provider":"Not Configured","SMS Provider":"Not Configured",WhatsApp:"Disabled","Courier / Delivery":"Not Configured"},
  Security:{sessionTimeout:30,requireStrongPasswords:true,requirePasswordChangeForNewStaff:true,loginAttemptLimit:5,auditLoggingEnabled:true},
};
