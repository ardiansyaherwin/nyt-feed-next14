import NewsCard from "@/components/card/news-card";
import { Article } from "@/types";

export interface NewsListProps {
  data: Article[] | null;
}

export const NewsList = ({ data }: NewsListProps) => {
  return (
    <>
      {data?.map((news) => (
        <a
          href={news.url}
          title="Go to original article"
          target="_blank"
          className="inline-flex outline-none border border-gray-50 rounded-xl hover:border-black focus:outline-none focus:ring-1 focus:ring-black"
          key={news.id}
        >
          <NewsCard data={news} />
        </a>
      ))}
    </>
  );
};
