import { useCallback, useState } from "react";
import api from "../../config/axios";

const useFetchClientData = <T>(
  clientId: string,
  endpoint: "purchases" | "services",
  entityName: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (data.length > 0) return;

    setLoading(true);

    try {
      const { data: responseData } = await api.get(
        `/clients/${clientId}/${endpoint}`,
      );
      setData(responseData);
    } catch (error) {
      console.log(`Error fetching ${entityName}:`, error);
      setData([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [clientId, endpoint, entityName, data.length]); // Incluimos data.length para controlar el re-fetching

  return { data, loading, fetchData, setData }; // Exportamos setData para inicializarlo si es necesario
};

export default useFetchClientData;
