import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch(`http://ip-api.com/json/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const resData = await response.json();

    return NextResponse.json({ resData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
