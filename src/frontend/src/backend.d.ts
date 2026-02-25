import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Quotation {
    id: bigint;
    status: QuotationStatus;
    priceAmount: bigint;
    quoteRequestId: bigint;
    description: string;
    validityDate: bigint;
    timestamp: bigint;
}
export interface QuoteRequest {
    id: bigint;
    customerName: string;
    status: Status;
    customerPhone: string;
    deadlineDate: bigint;
    message: string;
    timestamp: bigint;
    customerEmail: string;
    servicesNeeded: string;
}
export interface Message {
    id: bigint;
    content: string;
    quoteRequestId: bigint;
    timestamp: bigint;
    senderType: SenderType;
}
export interface UserProfile {
    name: string;
}
export enum QuotationStatus {
    pending = "pending",
    accepted = "accepted",
    declined = "declined"
}
export enum SenderType {
    admin = "admin",
    customer = "customer"
}
export enum Status {
    pending = "pending",
    completed = "completed",
    accepted = "accepted",
    declined = "declined",
    quoted = "quoted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptQuotation(id: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createQuotation(quoteRequestId: bigint, priceAmount: bigint, description: string, validityDate: bigint): Promise<bigint>;
    declineQuotation(id: bigint): Promise<void>;
    getAllMessages(): Promise<Array<Message>>;
    getAllQuotations(): Promise<Array<Quotation>>;
    getAllQuoteRequests(): Promise<Array<QuoteRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMessagesForQuoteRequest(quoteRequestId: bigint): Promise<Array<Message>>;
    getQuotation(id: bigint): Promise<Quotation | null>;
    getQuoteRequest(id: bigint): Promise<QuoteRequest | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendMessage(quoteRequestId: bigint, senderType: SenderType, content: string): Promise<void>;
    submitQuoteRequest(customerName: string, customerEmail: string, customerPhone: string, servicesNeeded: string, deadlineDate: bigint, message: string): Promise<bigint>;
    updateQuoteRequestStatus(id: bigint, status: Status): Promise<void>;
}
