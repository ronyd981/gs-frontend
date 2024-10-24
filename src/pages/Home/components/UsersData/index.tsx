import { ICSVTitles } from "@/interfaces";

import UsersDataChart from "./UsersDataChart";
import TweetData from "./TweetData";

interface IUsersDataProps {
  tweetsResults: Array<ICSVTitles>;
}

export default function UsersData({ tweetsResults }: IUsersDataProps) {
  return (
    <div
      className="
      w-full flex flex-col gap-4 row-start-1 col-span-5
      lg:col-span-3
    "
    >
      <TweetData tweetsResults={tweetsResults} />
      <UsersDataChart tweetsResults={tweetsResults} />
    </div>
  );
}
