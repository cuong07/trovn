/* eslint-disable react/prop-types */
import { ListingCard } from "../../../components";
import clsx from "clsx";
import { cn } from "../../../utils/helpers";

const Index = ({ data, column }) => {
  return (
    <div
      className={cn(
        clsx("grid grid-cols-5 px-20 gap-6", column && `grid-cols-${column}`)
      )}
    >
      {data.map((item) => (
        <ListingCard listing={item} key={item.id} />
      ))}
    </div>
  );
};

export default Index;
