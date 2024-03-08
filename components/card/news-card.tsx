import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Article } from "@/types";
import { format } from "date-fns";

const NewsCard = ({ data }: { data: Article }) => {
  return (
    <Card key={data.id} className="border-none">
      <CardHeader className="pb-2">
        <CardTitle className="leading-5">{data.headline}</CardTitle>
        <CardDescription className="text-gray-400 text-xs flex flex-col">
          <span className=" line-clamp-1">by {data.author || "-"}</span>
          <span>{format(new Date(data.pub_date), "MMM dd, yyyy")}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription className=" line-clamp-2">
          {data.abstract}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
