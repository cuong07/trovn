/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const Index = ({ label, control, name, errors, type, icon }) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <>
                            {type !== "password" && (
                                <Input
                                    {...field}
                                    prefix={icon}
                                    type={type}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            )}
                            {type === "password" && (
                                <Input
                                    {...field}
                                    prefix={icon}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    iconRender={(visible) =>
                                        visible ? <BsEye /> : <BsEyeSlashFill />
                                    }
                                />
                            )}
                        </>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 ">
                        {errors?.message}
                    </FormMessage>
                </FormItem>
            )}
        />
    );
};

export default Index;
