import { api } from "../transport";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { ListRequest } from "../types";
import { useEffect, useState } from "react";

const DEFAULT_QN = "skilla/use-load-list/DEFAULT_QN";

export const useLoadList = (defaultPayload: ListRequest) => {

  const [payload, setPayload] = useState<ListRequest>(defaultPayload)

  const loadList = () => api.transport.getList(payload);

  const {data, isLoading, refetch, remove, error, isFetching, isFetched} = useQuery(
    DEFAULT_QN,
    loadList,
    {
      keepPreviousData: true
    }
  );

  useEffect(() => {
    setTimeout(() => {
      refetch()
    }, 100)
  }, [payload, refetch])

  return {
    list: data?.data.results,
    isLoading,
    isFetching,
    refetch,
    remove,
    setPayload,
    payload,
    error: error as AxiosError,
    isFetched,
  };
};