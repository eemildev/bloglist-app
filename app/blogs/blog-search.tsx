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
    <div className="flex items-center justify-between">
      <form onSubmit={searchBlogs} className="w-1/2">
        <div className="flex flex-col">
          <label htmlFor="search" className="text-sm font-medium text-heading">
            Search
          </label>
          <div className="flex items-center gap-2">
            <input id="search" name="search" defaultValue={searchQuery} />
            <button className="btn" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
