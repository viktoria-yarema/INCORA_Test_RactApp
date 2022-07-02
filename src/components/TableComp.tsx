import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

interface TableCompProps<T> {
	columnNames:  Array<keyof T>;
	tableData: T[];
}

const renderColumnNames = <K,>(
	columnNames: Array<keyof K>
) => {
	return columnNames.map((name) => {
		return <TableCell align="right">{name as string}</TableCell>;
	});
};

const renderRowsTable = <U,>(tableRow: U) => {
	return Object.values(tableRow).map((value: string, index: number) => {
		return (
			<TableRow
				key={`key-table-${index * 2}`}
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
			>
				<TableCell align="right">{value}</TableCell>;
			</TableRow>
		);
	});
};

const TableComp = <T extends Record<string, string>>({
	columnNames,
	tableData,
}: TableCompProps<T>) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>{renderColumnNames<T>(columnNames)}</TableRow>
				</TableHead>
				<TableBody>{tableData.map(row => renderRowsTable<T>(row))}</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableComp;
