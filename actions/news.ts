"use server";

import { NYT_API_KEY } from "@/constants";
import { Article, NYTArticle } from "@/types";

export const fetchNews = async (page: number, keyword: string = "") => {
  const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${page}&q=${keyword}&api-key=${NYT_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data?.fault?.detail?.errorcode) return data?.fault?.detail?.errorcode;
    const formattedData =
      data?.response?.docs?.map((item: NYTArticle) => ({
        id: item?._id,
        headline: item?.headline?.main,
        author: item?.byline?.original?.substring(3),
        pub_date: item?.pub_date,
        abstract: item?.abstract,
        url: item?.web_url,
      })) || [];
    return formattedData as Article[];
  } catch (error) {
    console.log("Error fetching News: ", error);
    return null;
  }
};
