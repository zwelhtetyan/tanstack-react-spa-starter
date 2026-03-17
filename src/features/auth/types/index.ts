import type { EntityWithID } from "@/types";

export type User = EntityWithID<{
	name: string;
	email: string;
}>;
