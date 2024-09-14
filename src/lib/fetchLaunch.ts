export const fetchLaunchInformation = async () => {
  const response = await fetch(
    "https://fdo.rocketlaunch.live/json/launches/next/5"
  );
  const data = (await response.json()) as any;
  return data;
};
