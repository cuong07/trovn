/* eslint-disable react/prop-types */
import { ListingCard } from "../../../components";
import clsx from "clsx";
import { cn } from "../../../utils/helpers";

const Index = ({ data, column }) => {
    return (
        <div
            className={cn(
                clsx(
                    "grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6",
                    column && `xl:grid-cols-${column} 2xl:grid-cols-${column} `
                )
            )}
        >
            {data?.map((item) => (
                <ListingCard listing={item} key={item.id} />
            ))}
        </div>
    );
};

export default Index;
