import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/contexts/form-context";

type SubscribeButtonProps = ComponentProps<typeof Button> & {
	label: string;
};
export function SubscribeButton({
	label,
	...buttonProps
}: SubscribeButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button disabled={isSubmitting} type="button" {...buttonProps}>
					{isSubmitting && <Spinner />}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
