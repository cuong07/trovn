import { Button } from "antd";
import React from "react";

const index = ({ children, type, ...props }) => {
    return <Button type={type}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md
            text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
            disabled:opacity-50 h-10 px-4 py-2"  {...props} >
        {children}
    </Button>
}

export default index;