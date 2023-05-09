"use client";

import CountrySelect from "@/app/components/inputs/CountrySelect";
import { FC } from "react";
import { FormattedCountry } from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import Map from "@/app/components/Map";

const LocationBodyContent: FC<{
  onChange: (value: FormattedCountry) => void;
  currentLocation: FormattedCountry | null;
}> = ({ onChange, currentLocation }) => (
  <div className="flex flex-col gap-8">
    <Heading
      title="Where is your place located?"
      subTitle="Help guests find you!"
    />
    <CountrySelect value={currentLocation} onChange={onChange} />
    <Map center={currentLocation?.latlng} />
  </div>
);

export default LocationBodyContent;
