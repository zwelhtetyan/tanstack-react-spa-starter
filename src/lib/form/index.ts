import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { SubscribeButton } from "@/components/common/form/subscribe-button";
import { fieldContext, formContext } from "@/contexts/form-context";

const TextField = lazy(() => import("@/components/common/form/text-field"));

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubscribeButton,
	},
});
