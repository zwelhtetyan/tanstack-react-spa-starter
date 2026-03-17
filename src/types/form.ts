export type CommonFormProps<T extends object> = {
	onSubmit: (data: T, reset?: () => void) => void;
};
