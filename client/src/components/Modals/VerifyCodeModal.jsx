import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRef } from "react";
import useUserStore from "@/hooks/useUserStore";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

export const VerfiyCodeModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const otpRef = useRef(null);
    const { setOtp } = useUserStore();
    const isModalOpen = isOpen && type === "verifyCodeModal";
    const { handleSendEmailOtp, user, handleOk } = data;

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async () => {
        setOtp(otpRef.current.value);
        if (otpRef.current.value.length !== 0) {
            await handleOk();
        } else {
            toast("Không được để trống");
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xác minh địa chỉ email</DialogTitle>
                    <DialogDescription>
                        Vui lòng xác minh email trước khi đăng bài
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="code"
                            onChange={(e) => console.log(e)}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nhập mã code</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            // onChange={v => console.log(v)}
                                            {...field}
                                            ref={otpRef}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Nhập mã code được gửi về email của bạn
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" onClick={onSubmit}>
                            Submit
                        </Button>
                    </form>
                </Form>
                <DialogFooter>
                    <div className="text-xs">
                        {" "}
                        Gửi mã về email của bạn <strong>{user?.email}</strong>
                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={handleSendEmailOtp}
                        >
                            {" "}
                            gửi mã
                        </span>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
