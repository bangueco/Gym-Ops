import authAxios from "@/lib/axios";
import { InputMemberSchema } from "@/schemas";
import { Member, MemberResponse } from "@/types";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function memberQueryOptions(createdBy: number | undefined) {
  return queryOptions({
    queryKey: ["members"],
    queryFn: async () => (await authAxios.get(`/members?createdBy=${createdBy}`)).data as Member[] | null,
  })
}

export function useMemberQuery(createdBy: number | undefined) {
  return useQuery(memberQueryOptions(createdBy))
}

export function useAddMemberMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["addMember"],
    mutationFn: async ({ firstName, lastName, email, phoneNumber, membershipId, createdBy }: InputMemberSchema) => {
      return (await authAxios.post('/members', {firstName, lastName, email, phoneNumber, membershipId: parseInt(membershipId), createdBy})).data as MemberResponse
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
    mutationFn: async ({ memberId, firstName, lastName, email, phoneNumber, membershipId, createdBy }: Partial<Member>) => {
      return (await authAxios.put(`/members/${memberId}`, {firstName, lastName, email, phoneNumber, membershipId, createdBy})).data as MemberResponse
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