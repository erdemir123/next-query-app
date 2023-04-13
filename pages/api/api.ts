import { Iresponse, Result } from "@/time";

export default async function FetchPosts(name: string): Promise<Result[]> {
  console.log(name);
  const response = await fetch(
    `https://api.collectapi.com/pray/all?data.city=${name}`,
    {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        authorization: "apikey 5ZazXqb60azjQqPwj0yVEs:3WWYhYp81TUMDlnvsJaf5i",
      },
    }
  );

  const res = await response.json();
  const data: Result[] = res.result;
  return data;
}


