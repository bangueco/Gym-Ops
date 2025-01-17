import authAxios from "@/lib/axios";
import { InputMemberSchema } from "@/schemas";
import { Member, MemberResponse, MembersResponse } from "@/types";
import { keepPreviousData, queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function memberQueryOptions(createdBy: number | undefined, page: number | undefined, pageSize: number | undefined) {
  return queryOptions({
    queryKey: ["members", createdBy, page, pageSize],
    queryFn: async () => (await authAxios.get(`/members?createdBy=${createdBy}&page=${page}&pageSize=${pageSize}`)).data as MembersResponse | null,
    placeholderData: keepPreviousData
  })
}

function recentMemberQueryOptions(createdBy: number | undefined, page: number | undefined, pageSize: number | undefined) {
  return queryOptions({
    queryKey: ["recent-members", createdBy, page, pageSize],
    queryFn: async () => (await authAxios.get(`/members?createdBy=${createdBy}&page=${page}&pageSize=${pageSize}&descending=true`)).data as MembersResponse | null,
    placeholderData: keepPreviousData
  })
}

export function useMemberQuery(createdBy: number | undefined, page: number | undefined = 1, pageSize: number | undefined = 5) {
  return useQuery(memberQueryOptions(createdBy, page, pageSize))
}

export function useRecentMemberQuery(createdBy: number | undefined, page: number | undefined = 1, pageSize: number | undefined = 5) {
  return useQuery(recentMemberQueryOptions(createdBy, page, pageSize))
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
      queryClient.invalidateQueries({queryKey: ["recent-members"]})
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
      queryClient.invalidateQueries({queryKey: ["recent-members"]})
      queryClient.invalidateQueries({queryKey: ["memberships"]})
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
      queryClient.invalidateQueries({queryKey: ["recent-members"]})
      queryClient.invalidateQueries({queryKey: ["memberships"]})
    }
  })
}