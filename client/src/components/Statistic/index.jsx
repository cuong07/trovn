import { Counter } from "..";

/* eslint-disable react/prop-types */
const Index = ({ text, value, percent, type }) => {
    return (
        <div className="p-6 shadow-sm border rounded-lg ">
            <p className="text-sm ">{text}</p>
            <h3 className="font-semibold tracking-tight text-4xl">
                {value > 0 && (
                    <Counter type={type} value={value > 0 ? value : 0} />
                )}
                {value <= 0 && 0}
            </h3>
            {percent && (
                <>
                    {percent > 0 && (
                        <div className="text-xs text-green-600">
                            {`+${Math.abs(percent).toFixed(
                                2
                            )}% so với tháng truớc`}
                        </div>
                    )}
                    {percent < 0 && (
                        <div className="text-xs text-red-500">
                            {`- ${Math.abs(percent).toFixed(
                                2
                            )}% so với tháng truớc`}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Index;
