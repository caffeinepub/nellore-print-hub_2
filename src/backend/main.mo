import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration"; // separate migration module

(with migration = Migration.run)
actor {
  type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type QuoteRequest = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    servicesNeeded : Text;
    deadlineDate : Int;
    message : Text;
    timestamp : Int;
    status : Status;
  };

  public type Quotation = {
    id : Nat;
    quoteRequestId : Nat;
    priceAmount : Nat;
    description : Text;
    validityDate : Int;
    status : QuotationStatus;
    timestamp : Int;
  };

  public type Message = {
    id : Nat;
    quoteRequestId : Nat;
    senderType : SenderType;
    content : Text;
    timestamp : Int;
  };

  public type Status = {
    #pending;
    #quoted;
    #accepted;
    #declined;
    #completed;
  };

  public type QuotationStatus = {
    #pending;
    #accepted;
    #declined;
  };

  public type SenderType = {
    #customer;
    #admin;
  };

  var nextQuoteRequestId = 0;
  var nextQuotationId = 0;
  var nextMessageId = 0;

  let quoteRequests = Map.empty<Nat, QuoteRequest>();
  let quotations = Map.empty<Nat, Quotation>();
  let messages = Map.empty<Nat, Message>();

  // Quote Requests
  public shared ({ caller }) func submitQuoteRequest(
    customerName : Text,
    customerEmail : Text,
    customerPhone : Text,
    servicesNeeded : Text,
    deadlineDate : Int,
    message : Text,
  ) : async Nat {
    let quoteRequest : QuoteRequest = {
      id = nextQuoteRequestId;
      customerName;
      customerEmail;
      customerPhone;
      servicesNeeded;
      deadlineDate;
      message;
      timestamp = Time.now();
      status = #pending;
    };
    quoteRequests.add(nextQuoteRequestId, quoteRequest);
    nextQuoteRequestId += 1;
    quoteRequest.id;
  };

  public query ({ caller }) func getQuoteRequest(id : Nat) : async ?QuoteRequest {
    quoteRequests.get(id);
  };

  public query ({ caller }) func getAllQuoteRequests() : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    quoteRequests.values().toArray();
  };

  public shared ({ caller }) func updateQuoteRequestStatus(id : Nat, status : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    switch (quoteRequests.get(id)) {
      case (null) { Runtime.trap("Quote request not found") };
      case (?quoteRequest) {
        let updatedRequest = { quoteRequest with status };
        quoteRequests.add(id, updatedRequest);
      };
    };
  };

  // Quotations
  public shared ({ caller }) func createQuotation(
    quoteRequestId : Nat,
    priceAmount : Nat,
    description : Text,
    validityDate : Int,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    switch (quoteRequests.get(quoteRequestId)) {
      case (null) { Runtime.trap("Quote request not found") };
      case (?_) {
        let quotation : Quotation = {
          id = nextQuotationId;
          quoteRequestId;
          priceAmount;
          description;
          validityDate;
          status = #pending;
          timestamp = Time.now();
        };
        quotations.add(nextQuotationId, quotation);
        nextQuotationId += 1;
        quotation.id;
      };
    };
  };

  public query ({ caller }) func getQuotation(id : Nat) : async ?Quotation {
    quotations.get(id);
  };

  public query ({ caller }) func getAllQuotations() : async [Quotation] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    quotations.values().toArray();
  };

  public shared ({ caller }) func acceptQuotation(id : Nat) : async () {
    updateQuotationStatus(id, #accepted);
  };

  public shared ({ caller }) func declineQuotation(id : Nat) : async () {
    updateQuotationStatus(id, #declined);
  };

  func updateQuotationStatus(id : Nat, status : QuotationStatus) {
    switch (quotations.get(id)) {
      case (null) { Runtime.trap("Quotation not found") };
      case (?quotation) {
        let updatedQuotation = { quotation with status };
        quotations.add(id, updatedQuotation);
      };
    };
  };

  // Messaging
  public shared ({ caller }) func sendMessage(quoteRequestId : Nat, senderType : SenderType, content : Text) : async () {
    switch (senderType) {
      case (#admin) {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
          Runtime.trap("Unauthorized: Admins only");
        };
      };
      case (#customer) {};
    };

    switch (quoteRequests.get(quoteRequestId)) {
      case (null) { Runtime.trap("Quote request not found") };
      case (?_) {
        let message : Message = {
          id = nextMessageId;
          quoteRequestId;
          senderType;
          content;
          timestamp = Time.now();
        };
        messages.add(nextMessageId, message);
        nextMessageId += 1;
      };
    };
  };

  public query ({ caller }) func getMessagesForQuoteRequest(quoteRequestId : Nat) : async [Message] {
    let filteredMessages = List.empty<Message>();
    for ((_, message) in messages.entries()) {
      if (message.quoteRequestId == quoteRequestId) {
        filteredMessages.add(message);
      };
    };
    filteredMessages.reverse().toArray();
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    messages.values().toArray();
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };
};
