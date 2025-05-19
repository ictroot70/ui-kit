import { CheckIcon } from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import stl from "./SelectItems.module.scss";
import { clsx } from "clsx";

import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef, type ReactNode } from "react";

type Props = {
    className?: string;
    value: string;
    children?: ReactNode;
} & ComponentPropsWithoutRef<typeof RadixSelect.Item>;

export const SelectItem = forwardRef<ComponentRef<typeof RadixSelect.Item>, Props>(
    ({ value, children, disabled, className, ...rest }, ref) => {
        return (
            <RadixSelect.Item
                className={clsx(stl.itemWrapper, className)}
                value={value}
                disabled={disabled}
                ref={ref}
                {...rest}
            >
                <RadixSelect.ItemText asChild>
                    {children}
                </RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className={stl.ItemIndicator}>
                    <CheckIcon />
                </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
        );
    }
);

SelectItem.displayName = "SelectItem";