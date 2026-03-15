export type TypeID<T = string | number> = T;

export type EntityWithID<T extends object, CustomID = TypeID> = T & {
	id: TypeID<CustomID>;
};

/**
 * Brand<T, Name> — nominal type: T with a compile-time-only brand Name.
 * Example: type Positive = Brand<number, "Positive">
 */
export type Brand<T, N extends string> = T & { readonly __brand: N };
