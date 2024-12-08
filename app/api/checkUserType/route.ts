import { confirmUserIsOwner } from "@/utils/actions";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const isUserAnOwner = await confirmUserIsOwner(userId);
    return NextResponse.json({ isUserAnOwner });
  } catch (error) {
    console.error("Failed to fetch UserType", error);
    return NextResponse.json(
      {
        message: "Failed to fetch UserType",
        error,
      },
      { status: 400 }
    );
  }
};
