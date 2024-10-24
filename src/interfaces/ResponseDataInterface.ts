interface IEmotionOrSentiment {
  label: string;
  score: number;
}
export interface ICSVTitles {
  text: string;
  likes: number;
  comments: number;
  shares: number;
  reactions_count: number;
  emotion?: Array<IEmotionOrSentiment>;
  sentiment?: Array<IEmotionOrSentiment>;
}
