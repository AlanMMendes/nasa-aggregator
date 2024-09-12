import { writable } from "svelte/store";

export const fetchData = async (url: string) => {
  curiosity.set({
    data: [],
    loading: true,
    error: null,
  });
  try {
    const response = await fetch(url);
    const data = await response.json();
    await curiosity.set({
      data: data,
      loading: false,
      error: null,
    });
  } catch (error) {
    curiosity.set({ data: [], loading: false, error: error });

    throw error;
  }
};

export const curiosity: any = writable({
  data: [],
  loading: true,
  error: null,
});
