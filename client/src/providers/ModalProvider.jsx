import { VerfiyCodeModal } from "@/components/Modals/VerifyCodeModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setItMounted] = useState(false);

    useEffect(() => {
        setItMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <VerfiyCodeModal />
        </>
    );
};
