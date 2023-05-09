"use client";

import CategoryInput from "@/app/components/inputs/CategoryInput";
import { FC } from "react";
import Heading from "@/app/components/Heading";
import { categories } from "@/app/components/navbar/Categories";

const CategoryBodyContent: FC<{
  currentCategory: string;
  onCategorySelect: (category: string) => void;
}> = ({ currentCategory, onCategorySelect }) => (
  <div className="flex flex-col gap-8">
    <Heading
      title="Which of these best describes your place?"
      subTitle="Pick a category"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
      {categories.map((item) => (
        <div key={item.label} className="col-span-1">
          <CategoryInput
            {...item}
            selected={currentCategory === item.label}
            onClick={onCategorySelect}
          />
        </div>
      ))}
    </div>
  </div>
);

export default CategoryBodyContent;
