"use client";

import Counter from "@/app/components/inputs/Counter";
import { FC } from "react";
import Heading from "@/app/components/Heading";

const InfoBodyContent: FC<{
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  onChange: (value: {
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
  }) => void;
}> = ({ guestCount, onChange: onChange, roomCount, bathroomCount }) => (
  <div className="flex flex-col gap-8">
    <Heading
      title="Share some basics about your place"
      subTitle="What amenities do you have?"
    />
    <Counter
      title="Guests"
      subtitle="How many guests do you allow?"
      value={guestCount}
      onChange={(guestCount) => onChange({ guestCount })}
    />
    <hr />

    <Counter
      title="Rooms"
      subtitle="How many rooms do you have?"
      value={roomCount}
      onChange={(roomCount) => onChange({ roomCount })}
    />
    <hr />
    <Counter
      title="Bathrooms"
      subtitle="How many Bathrooms do you have?"
      value={bathroomCount}
      onChange={(bathroomCount) => onChange({ bathroomCount })}
    />
  </div>
);

export default InfoBodyContent;
