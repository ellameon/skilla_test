import { api } from "../transport";
import { useQuery } from "react-query";

export const useGetCallRecord = (enabled: boolean, record: string, partnership_id: string) => {
  const DEFAULT_QN = "skilla/use-load-call-record/DEFAULT_QN";

  const fetchCallRecord = async () => {
    const response = await api.transport.getCallRecord(record, partnership_id);
    const blob = await response.data;
    return URL.createObjectURL(blob)
  };

  const {data: mp3Url, isLoading, isError, error} = useQuery(
    DEFAULT_QN,
    fetchCallRecord,
    {
      enabled,
      keepPreviousData: true,
    }
  );

  return {
    data: mp3Url,
    isLoading,
    isError,
    error,
  };
};