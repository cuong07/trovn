/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { formatCurrency } from "@/utils/helpers";

export default function Counter({ value, direction = "up", type = "number" }) {
    const ref = useRef(null);

    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 200,
        stiffness: 2000,
    });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView, direction, value]);

    useEffect(
        () =>
            springValue.on("change", (latest = 1) => {
                if (ref.current) {
                    if (latest > 0) {
                        ref.current.textContent =
                            type === "currency"
                                ? formatCurrency(latest)
                                : latest.toFixed(0);
                    } else {
                        ref.current.textContent = 0;
                    }
                }
            }),
        [ref, springValue, type]
    );

    return <span ref={ref} />;
}
