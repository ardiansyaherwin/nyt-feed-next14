export interface NYTArticle {
  _id: string;
  headline: {
    main: string;
  };
  abstract: string;
  pub_date: Date;
  byline: {
    original: string;
  };
  web_url: string;
}

export interface Article {
  id: string;
  headline: string;
  author: string;
  pub_date: Date;
  abstract: string;
  url: string;
}
