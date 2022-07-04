
export const normalizeColumnsNames = <T>(
	data: T[],
	isAction?: boolean
): string[] => {
	const columnData = data[0];
	const dataKeys = Object.keys(columnData);
	return isAction ? [...dataKeys, "action"] : dataKeys;
};

export const replaceObjectToArray = <K>(itarableItem: K): (string | string[])[] => {
  const values = Object.values(itarableItem) as string[];
  const result = values.map(val => {
    return typeof val === "object" ? replaceObjectToArray(val) : val;
  });

  return result as (string | string[])[];
};
