export type RoutesType<T extends string> = Record<T, RouteType>;

export type RouteType = {
	url: string;
	element: React.ReactNode;
};
