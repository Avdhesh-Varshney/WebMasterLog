"use client";

import Container from "../Container";
import categories from "../constants/categoryList";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
            description={item.description}
            key={item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
