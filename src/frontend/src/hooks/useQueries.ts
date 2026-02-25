import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type QuoteRequest, type Quotation, type Message, type UserProfile, Status, SenderType } from '../backend';

// ─── Quote Requests ──────────────────────────────────────────────────────────

export function useSubmitQuoteRequest() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      customerName,
      customerEmail,
      customerPhone,
      servicesNeeded,
      deadlineDate,
      message,
    }: {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      servicesNeeded: string;
      deadlineDate: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitQuoteRequest(customerName, customerEmail, customerPhone, servicesNeeded, deadlineDate, message);
    },
  });
}

export function useGetQuoteRequest(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<QuoteRequest | null>({
    queryKey: ['quoteRequest', String(id)],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getQuoteRequest(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
    retry: false,
  });
}

export function useGetAllQuoteRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<QuoteRequest[]>({
    queryKey: ['quoteRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuoteRequests();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useUpdateQuoteRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: Status }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateQuoteRequestStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quoteRequests'] });
      queryClient.invalidateQueries({ queryKey: ['quoteRequest'] });
    },
  });
}

// ─── Quotations ──────────────────────────────────────────────────────────────

export function useCreateQuotation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quoteRequestId,
      priceAmount,
      description,
      validityDate,
    }: {
      quoteRequestId: bigint;
      priceAmount: bigint;
      description: string;
      validityDate: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createQuotation(quoteRequestId, priceAmount, description, validityDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['quoteRequests'] });
    },
  });
}

export function useGetQuotation(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Quotation | null>({
    queryKey: ['quotation', String(id)],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getQuotation(id);
    },
    enabled: !!actor && !actorFetching && id !== null,
    retry: false,
  });
}

export function useGetAllQuotations() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Quotation[]>({
    queryKey: ['quotations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuotations();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useAcceptQuotation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quotationId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.acceptQuotation(quotationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['quotation'] });
    },
  });
}

export function useDeclineQuotation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quotationId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.declineQuotation(quotationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['quotation'] });
    },
  });
}

// ─── Messages ────────────────────────────────────────────────────────────────

export function useGetMessagesForQuoteRequest(quoteRequestId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Message[]>({
    queryKey: ['messages', String(quoteRequestId)],
    queryFn: async () => {
      if (!actor || !quoteRequestId) return [];
      return actor.getMessagesForQuoteRequest(quoteRequestId);
    },
    enabled: !!actor && !actorFetching && quoteRequestId !== null,
    retry: false,
  });
}

export function useGetAllMessages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Message[]>({
    queryKey: ['allMessages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quoteRequestId,
      senderType,
      content,
    }: {
      quoteRequestId: bigint;
      senderType: SenderType;
      content: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.sendMessage(quoteRequestId, senderType, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', String(variables.quoteRequestId)] });
      queryClient.invalidateQueries({ queryKey: ['allMessages'] });
    },
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Admin Check ──────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
