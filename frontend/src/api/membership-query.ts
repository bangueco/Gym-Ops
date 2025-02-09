import authAxios from "@/lib/axios";
import { InputMembershipSchema } from "@/schemas";
import { Membership, MembershipResponse, MembershipsResponse } from "@/types";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function membershipQueryOptions(createdBy: number | undefined, page: number | undefined, pageSize: number | undefined) {
  return queryOptions({
    queryKey: ["memberships"],
    queryFn: async () => (await authAxios.get(`/memberships?createdBy=${createdBy}&page=${page}&pageSize=${pageSize}`)).data as MembershipsResponse | null,
  })
}

export function useMembershipQuery(createdBy: number | undefined, page: number | undefined, pageSize: number | undefined) {
  return useQuery(membershipQueryOptions(createdBy, page, pageSize));
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
    mutationFn: async ({ membershipName, membershipLength, createdBy, membershipFee }: InputMembershipSchema) => {
      return (await authAxios.post('/memberships', { membershipName, membershipLength, createdBy, membershipFee })).data as MembershipResponse
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
    mutationFn: async ({ membershipId, membershipName, membershipLength, createdBy, membershipFee }: Membership) => {
      return (await authAxios.put(`/memberships/${membershipId}`, { membershipName, membershipLength, createdBy, membershipFee })).data as MembershipResponse
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