import authAxios from "@/lib/axios";
import { InputMemberSchema } from "@/schemas";
import { Member, MemberResponse } from "@/types";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function memberQueryOptions() {
  return queryOptions({
    queryKey: ["members"],
    queryFn: async () => (await authAxios.get("/members")).data as Member[] | null,
  })
}

export function useMemberQuery() {
  return useQuery(memberQueryOptions())
}

export function useAddMemberMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["addMember"],
    mutationFn: async ({ firstName, lastName, email, phoneNumber, membershipId }: InputMemberSchema) => {
      return (await authAxios.post('/members', {firstName, lastName, email, phoneNumber, membershipId: parseInt(membershipId)})).data as MemberResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["members"]})
    }
  })
}

export function useUpdateMemberMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateMember"],
    mutationFn: async ({ memberId, firstName, lastName, email, phoneNumber, membershipId }: Partial<Member>) => {
      return (await authAxios.put(`/members/${memberId}`, {firstName, lastName, email, phoneNumber, membershipId})).data as MemberResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["members"]})
    }
  })
}

export function useDeleteMemberMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteMember"],
    mutationFn: async (memberId: number) => {
      return (await authAxios.delete(`/members/${memberId}`)).data as MemberResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["members"]})
    }
  })
}