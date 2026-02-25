import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  type OldActor = {
    contactMessages : Map.Map<Nat, { id : Nat; name : Text; phoneNumber : Text; message : Text }>;
    nextMessageId : Nat;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  type NewActor = {
    nextQuoteRequestId : Nat;
    nextQuotationId : Nat;
    nextMessageId : Nat;
    quoteRequests : Map.Map<Nat, { id : Nat; customerName : Text; customerEmail : Text; customerPhone : Text; servicesNeeded : Text; deadlineDate : Int; message : Text; timestamp : Int; status : { #pending; #quoted; #accepted; #declined; #completed } }>;
    quotations : Map.Map<Nat, { id : Nat; quoteRequestId : Nat; priceAmount : Nat; description : Text; validityDate : Int; status : { #pending; #accepted; #declined }; timestamp : Int }>;
    messages : Map.Map<Nat, { id : Nat; quoteRequestId : Nat; senderType : { #customer; #admin }; content : Text; timestamp : Int }>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    {
      nextQuoteRequestId = 0;
      nextQuotationId = 0;
      nextMessageId = old.nextMessageId;
      quoteRequests = Map.empty<Nat, { id : Nat; customerName : Text; customerEmail : Text; customerPhone : Text; servicesNeeded : Text; deadlineDate : Int; message : Text; timestamp : Int; status : { #pending; #quoted; #accepted; #declined; #completed } }>();
      quotations = Map.empty<Nat, { id : Nat; quoteRequestId : Nat; priceAmount : Nat; description : Text; validityDate : Int; status : { #pending; #accepted; #declined }; timestamp : Int }>();
      messages = Map.empty<Nat, { id : Nat; quoteRequestId : Nat; senderType : { #customer; #admin }; content : Text; timestamp : Int }>();
      userProfiles = old.userProfiles;
    };
  };
};
