export const fetchRoverInformation = async (type: any) => {
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${type}/latest_photos?api_key=oBKUfq4ojUgfJdXxmYCP8EAnvIWw9NtXP172FpqR`
  );
  const data = (await response.json()) as any;
  return data.latest_photos;
};
