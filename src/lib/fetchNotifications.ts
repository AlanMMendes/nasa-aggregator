export const fetchNotifications = async () => {
  const response = await fetch(
    "https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=oBKUfq4ojUgfJdXxmYCP8EAnvIWw9NtXP172FpqR"
  );
  const data = (await response.json()) as any;
  return data;
};
