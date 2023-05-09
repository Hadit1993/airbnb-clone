import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json("Unauthorized user", { status: 401 });

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  for (const [key, value] of Object.entries(body)) {
    if (!value)
      return NextResponse.json(
        { [key]: `${key} is required` },
        { status: 400 }
      );
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
