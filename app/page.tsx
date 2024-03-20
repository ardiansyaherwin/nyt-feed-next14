'use client';
import { fetchNews } from '@/actions/news';
import { NewsList } from '@/components/news-list';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { generateQueryParam } from '@/lib/generate-query-param';
import { Article } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const search = searchParams.get('search');
  const { toast } = useToast();
  const [news, setNews] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(-1);
  const [isFetching, startFetchTransition] = useTransition();

  const fetchData = async (keyword: string = '') => {
    if (isFetching) return;

    startFetchTransition(async () => {
      const pageParam = !!keyword ? 0 : currentPage + 1;

      const keywordParam = keyword || search;
      const res = await fetchNews(pageParam, keywordParam as string);
      if (res === 'policies.ratelimit.QuotaViolation') {
        toast({
          title: 'Something went wrong!',
          description: 'Either you ran out of limit or due to server error',
          action: (
            <ToastAction altText="Try again" onClick={() => fetchData()}>
              Try again
            </ToastAction>
          ),
        });
        return;
      }
      let newData = res || ([] as Article[]);

      if (pageParam > 0) {
        newData = [...news, ...newData];
      }
      setNews(newData);
      setCurrentPage(pageParam);
    });
  };

  const handleSearch = useCallback(
    (keyword: string) => {
      setNews([]);
      setCurrentPage(-1);
      const newQueryParam = generateQueryParam(searchParams, 'search', keyword);
      router.replace(`${pathname}?${newQueryParam}`);
    },
    [searchParams]
  );

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      <header className="sticky top-0 pt-8 pb-4 bg-black text-white">
        <div className="container">
          <h1 className="text-center text-lg font-bold">NYT Feed App</h1>
          <SearchBar
            disabled={isFetching}
            onSubmit={handleSearch}
            defaultValue={search as string}
          />
        </div>
      </header>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          <NewsList data={news} />
        </div>
        <Button
          disabled={isFetching}
          className="flex gap-2 w-full mt-4 mb-12 border border-black rounded-[6px] bg-black text-white hover:bg-white hover:text-black"
          onClick={() => fetchData()}
        >
          {isFetching ? <Spinner /> : ''}
          {isFetching ? 'Please wait' : 'Load more'}
        </Button>
      </div>
    </>
  );
}
