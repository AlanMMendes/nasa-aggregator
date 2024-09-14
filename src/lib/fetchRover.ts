export const fetchRoverInformation = async () => {
  const response = await fetch(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=oBKUfq4ojUgfJdXxmYCP8EAnvIWw9NtXP172FpqR"
  );
  const data = (await response.json()) as any;
  return data.photos;
};
