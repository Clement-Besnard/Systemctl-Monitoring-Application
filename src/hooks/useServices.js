import { useState, useEffect, useCallback } from "react";
import { getServices, getFailedServices }   from "../api/services.api.js";

export function useServices(stateFilter) {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getServices(stateFilter);
      setServices(data.services ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [stateFilter]);

  useEffect(() => { fetch(); }, [fetch]);
  return { services, loading, error, refetch: fetch };
}

export function useFailed() {
  const [failed,  setFailed]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFailedServices()
      .then(d => setFailed(d.failed_services ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { failed, loading };
}