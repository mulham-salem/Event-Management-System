import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { hostsApi, type FetchHostsParams, type HostsResponse, type VoteRequest, type VoteResponse } from "../api/hosts";

// =====================
// Fetch Hosts
// =====================
export const useHosts = (params: FetchHostsParams) => {
  return useQuery<HostsResponse>({
    queryKey: ["hosts", params],
    queryFn: () => hostsApi.fetchHosts(params),
    placeholderData: keepPreviousData,
  });
};

// =====================
// Vote for Host
// =====================
export const useVoteForHost = () => {
  const queryClient = useQueryClient();

  return useMutation<VoteResponse, Error, VoteRequest>({
    mutationFn: hostsApi.voteForHost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hosts"],
      });
    },
  });
};
