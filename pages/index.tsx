import { UseQueryResult, useQuery } from "react-query";
import FetchPosts from "./api/api";
import TurkeyMap from "turkey-map-react";
import { useState } from "react";
import { Result } from "@/time";
import getPosts from "./api/get";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Istanbul");
  const { data, isLoading, isError } = useQuery<Result[]>(
    ["posts", selectedCity], 
    () => FetchPosts(turkishToEnglish(selectedCity))
  );
  function turkishToEnglish(str: string) {
    const turkishChars = "ğüşıöçĞÜŞİÖÇ";
    const englishChars = "gusiocGUSIOC";

    // Türkçe harfleri İngilizce harflerle değiştir
    const strArr = str.split("");
    const englishStrArr = strArr.map((char: string) => {
      const index = turkishChars.indexOf(char);
      return index !== -1 ? englishChars[index] : char;
    });

    return englishStrArr.join("");
  }

  const [pcity, SetPcity] = useState("");

  return (
    <>
      <h1 className="font-bold text-center mt-4 text-lg text-emerald-400">
        Ezan Vakitleri
      </h1>
      <div className="">
        <TurkeyMap
          viewBox={{ top: 0, left: 80, width: 1050, height: 585 }}
          onClick={({ name }) => setSelectedCity(name)}
          hoverable={true}
          onHover={({ plateNumber, name }) =>
            SetPcity(`${plateNumber}-${name}`)
          }
          customStyle={{ idleColor: "#7f9595", hoverColor: "#317d85" }}
        />
        <p className="font-bold text-center  text-lg text-emerald-400">
          {pcity}
        </p>
        <div className="flex justify-around mt-4 px-2">
          {data?.map((item: Result) => (
            <div>{item.vakit}</div>
          ))}
        </div>
        <div className="flex justify-around mt-4 px-2">
          {data?.map((item: Result) => (
            <div>{item.saat}</div>
          ))}
        </div>
      </div>
    </>
  );
}
