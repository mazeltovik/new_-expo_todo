import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useState } from 'react';
import { useToast } from "react-native-toast-notifications";

export default function useFetch<T>(url: string) {
  const toast = useToast();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  async function request<B>(method: string, body: B) {
    try {
      setLoading(true);
      let response: AxiosResponse | null = null;
      if (method == 'post') {
        if (body) {
          response = await axios.post<T>(url, body);
        }
        if (response) {
          setData(response?.data);
          toast.show("You have successfully added a task", {
            type: "success",
            placement: "bottom",
            duration: 4000,
            animationType: "slide-in",
          });
        }
      }
      if (method == 'put') {
        if (body) {
          response = await axios.put<T>(url, body);
        }
        if (response) {
          setData(response?.data);
          toast.show("You have successfully changed a task", {
            type: "success",
            placement: "bottom",
            duration: 4000,
            animationType: "slide-in",
          });
        }
      }
      if (method == 'delete') {
        if (body) {
          response = await axios.delete<T>(url, {
            data: body,
            headers: { Authorization: '***' },
          });
        }
        if (response) {
          setData(response?.data);
          toast.show("You have successfully deleted a task", {
            type: "warning",
            placement: "bottom",
            duration: 4000,
            animationType: "slide-in",
          });
        }
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const errMsg = err.response?.data?.err as string;
        toast.show(`${errMsg}`, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
        });
      }
    } finally {
      setLoading(false);
    }
  }
  return { data, isLoading, request };
}