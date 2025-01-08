import authAxios from "@/lib/axios";
import { InputMembershipSchema } from "@/schemas";
import { Membership, MembershipResponse } from "@/types";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function membershipQueryOptions() {
  return queryOptions({
    queryKey: ["memberships"],
    queryFn: async () => (await authAxios.get("/memberships")).data as Membership[] | null,
  })
}

export function useMembershipQuery() {
  return useQuery(membershipQueryOptions());
}

export function useMembershipByIdQuery(membershipId: number) {
  return useQuery({
    queryKey: ['membership', membershipId],
    queryFn: async () => (await authAxios.get(`/memberships/${membershipId}`)).data as Membership
  })
}

export function useAddMembershipMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["addMembership"],
    mutationFn: async ({ membershipName, membershipLength, createdBy }: InputMembershipSchema) => {
      return (await authAxios.post('/memberships', { membershipName, membershipLength, createdBy })).data as MembershipResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["memberships"]})
    },
    onError: (error) => {
      console.error(error)
    }
  })
}

export function useUpdateMembershipMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateMembership"],
    mutationFn: async ({ membershipId, membershipName, membershipLength }: Membership) => {
      console.log(membershipId, membershipName, membershipLength)
      return (await authAxios.put(`/memberships/${membershipId}`, { membershipName, membershipLength })).data as MembershipResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["memberships"]})
    }
  })
}

export function useDeleteMembershipMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteMembership"],
    mutationFn: async (membershipId: number) => {
      return (await authAxios.delete(`/memberships/${membershipId}`)).data as MembershipResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["memberships"]})
    }
  })
}