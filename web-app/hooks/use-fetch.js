import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await cb(...args);
      
      if (response?.success === false) {
        throw new Error(response.error || "Operation failed");
      }

      setData(response);
      return response;
    } catch (err) {
      console.error("Error in useFetch:", err);
      setError(err);
      toast.error(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;