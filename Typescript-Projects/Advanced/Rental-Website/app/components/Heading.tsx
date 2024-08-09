"use client";

interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} pt-5`}>
      <div className="text-2xl font-bold">{title}</div>
      {subTitle && <div className="font-light text-neutral-500 mt-2">{subTitle}</div>}
    </div>
  );
};

export default Heading;
