import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") === "" ? "1" : searchParams.get("page");
  const searchQuery =
    searchParams.get("q") === "" ? "NextJS" : searchParams.get("q");
  const country = searchParams.get("country");
  const encodedQuery = encodeURIComponent(
    `${searchQuery} ${country ? `in ${country}` : ""}`
  );

  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodedQuery}&page=${page}&num_pages=1&date_posted=all`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();

    const data = responseData.data;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
