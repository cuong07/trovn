/* eslint-disable react/prop-types */
import { Button } from "antd";
import { motion } from "framer-motion";
const Index = ({ children, type, ...props }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        type={type}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md
        text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
        w-full disabled:opacity-50 h-12 px-4 py-2"
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default Index;
