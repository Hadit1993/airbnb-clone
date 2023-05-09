"use client";

import CategoryBox, { CategoryProps } from "./CategoryBox";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { TbBeach, TbMountain } from "react-icons/tb";
import { usePathname, useSearchParams } from "next/navigation";

import { BsSnow } from "react-icons/bs";
import Container from "../Container";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { useMemo } from "react";

export const categories: CategoryProps[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is on an island!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is modern!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },

  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },

  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },

  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has arctic activities!",
  },

  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },

  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },

  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },

  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = useMemo(() => pathName === "/", [pathName]);

  if (!isMainPage) return null;
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            {...item}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
