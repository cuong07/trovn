/* eslint-disable react/prop-types */
import clsx from "clsx";
import { motion } from "framer-motion";

import { ListingCard } from "@/components";
import { cn } from "@/utils/helpers";
const Index = ({ data, column }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const listVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };
    return (
        <motion.ul
            initial="hidden"
            animate="visible"
            variants={listVariants}
            className={cn(
                clsx(
                    "grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6",
                    column && `xl:grid-cols-${column} 2xl:grid-cols-${column} `
                )
            )}
        >
            {data?.map((item) => (
                <motion.li key={item.id} variants={itemVariants}>
                    <ListingCard listing={item} />
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default Index;
