"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
      ">
      {label}
    </div>
  );
};

export default MenuItem;
