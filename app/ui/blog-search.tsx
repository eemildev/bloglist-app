"use client";
import { type SubmitEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BlogSearch({ searchQuery }: { searchQuery: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const searchBlogs = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const term = (formData.get("search") as string | null)?.trim() ?? "";
    handleSearch(term);
  };

  return (
    <div>
      <form onSubmit={searchBlogs}>
        <div>
          <label>
            Title
            <input type="text" name="search" defaultValue={searchQuery} />
          </label>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}
