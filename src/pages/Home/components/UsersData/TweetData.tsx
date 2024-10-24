import { useState, useMemo } from "react";
import { ICSVTitles } from "@/interfaces";

import Comment from "@/assets/icons/comments.svg";
import Retweet from "@/assets/icons/retweet.svg";
import Heart from "@/assets/icons/heart.svg";
import Stats from "@/assets/icons/stats.svg";

interface ITweetDataProps {
  tweetsResults: Array<ICSVTitles>;
}

export default function TweetData({ tweetsResults }: ITweetDataProps) {
  const [filter, setFilter] = useState<string>("");

  const filterOptions = [
    { id: "likes", label: "Me gusta" },
    { id: "comments", label: "Comentarios" },
    { id: "shares", label: "Compartidos" },
    { id: "reactions", label: "Reacciones" },
  ];

  const filteredTweets = useMemo(() => {
    let sortedTweets = [...tweetsResults];

    if (filter === "likes") {
      sortedTweets.sort((a, b) => b.likes - a.likes);
    } else if (filter === "comments") {
      sortedTweets.sort((a, b) => b.comments - a.comments);
    } else if (filter === "shares") {
      sortedTweets.sort((a, b) => b.shares - a.shares);
    } else if (filter === "reactions") {
      sortedTweets.sort((a, b) => b.reactions_count - a.reactions_count);
    }

    return sortedTweets.slice(0, 3);
  }, [tweetsResults, filter]);

  const handleFilterChange = (newFilter: string) => setFilter(newFilter);

  const clearFilter = () => setFilter("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h6 className="text-xl font-bold">Filtrar tweets</h6>
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              className={`max-w-max px-2 py-1.5 rounded ${
                filter === option.id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleFilterChange(option.id)}
              aria-pressed={filter === option.id}
            >
              {option.label}
            </button>
          ))}
          <button
            className="max-w-max px-4 py-2 bg-red-500 text-white rounded"
            onClick={clearFilter}
          >
            Limpiar filtro
          </button>
        </div>
      </div>

      <div
        className="
          grid grid-cols-2 gap-4
          md:grid-cols-3 md:grid-rows-1
        "
      >
        {filteredTweets.map((tweet, index) => (
          <div
            className={`
              w-full h-auto flex flex-col gap-3 px-4 py-6 bg-white border shadow-sm rounded-md hover:shadow-md transition duration-150
              ${
                index === 0
                  ? "col-span-full md:col-auto"
                  : "row-start-2 md:row-start-1 md:col-auto"
              }
            `}
            key={index}
            title={tweet.text}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
              <span className="text-sm text-gray-500 sm:text-base">A</span>
            </div>
            <p className="text-gray-800 line-clamp-5">{tweet.text}</p>
            <ul className="w-full flex items-center gap-x-4 gap-y-1 flex-wrap pt-2 mt-auto">
              <li>
                <div className="flex items-center gap-0.5">
                  <img src={Comment} className="w-5 h-5" alt="Comment icon" />
                  <span className="text-sm text-gray-500">
                    {tweet.comments}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-0.5">
                  <img src={Retweet} className="w-5 h-5" alt="Retweet icon" />
                  <span className="text-sm text-gray-500">{tweet.shares}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-0.5">
                  <img src={Heart} className="w-5 h-5" alt="Heart icon" />
                  <span className="text-sm text-gray-500">{tweet.likes}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-0.5">
                  <img src={Stats} className="w-5 h-5" alt="Stats icon" />
                  <span className="text-sm text-gray-500">
                    {tweet.reactions_count}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
