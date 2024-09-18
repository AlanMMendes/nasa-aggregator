export const fetchNotifications = async (
  startDate: string,
  endDate: string
) => {
  const response = await fetch(
    `https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=all&api_key=oBKUfq4ojUgfJdXxmYCP8EAnvIWw9NtXP172FpqR`
  );
  const data = (await response.json()) as any;
  return data;
};
