'use client';

import { useBooksContext } from "app/context/itemsContext";
import BookDetails from "./layouts/BookDetails";
import { Book } from "@/types/Book";
import { useEffect, useState } from "react";
import BookDetailsSkeleton from "@/components/loading-ui/BookDetailsSkeleton";

const BookView = ({ name }: { name: string }) => {
  const contextValue = useBooksContext();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (contextValue) {
      setData(
        contextValue.find((item) => item.slug === name)
      );
    }

  }, [contextValue, name]);

  return (<>
    {data ?
      <BookDetails slug={name} initialData={data} />
      : <BookDetailsSkeleton />
    }
  </>);
}

export default BookView;