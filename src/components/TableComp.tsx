import React, { FC } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	capitalize,
	Button,
} from "@mui/material";

type ButtonTableType = {
	label: string;
};

export type TableDataType = {
	data: (string | string[])[];
	event?: (params?: string) => void;
	href?: string;
};
interface TableCompProps {
	columnNames: string[];
	tableData: TableDataType[];
	button?: ButtonTableType;
}

const renderColumnNames = (columnNames: string[]) => {
	return columnNames.map((name, index: number) => (
		<TableCell key={`key-table_head-${index * 5}`} align="right">
			<Typography variant="h6">{capitalize(name)}</Typography>
		</TableCell>
	));
};

const renderRowsTable = (tableRow: (string | string[])[]) => {
	return tableRow.map((value: string | string[], index: number) => {
		return (
			<React.Fragment key={`key-table_cel-${index * 5}${value}`}>
				{typeof value === "object" ? (
					<TableCell align="right">
						{Object.values(value).map(val => {
							return <div key={`key-table_item-${index}${val}`}>{val}</div>;
						})}
					</TableCell>
				) : (
					<TableCell align="right">{value}</TableCell>
				)}
			</React.Fragment>
		);
	});
};

const TableComp: FC<TableCompProps> = ({ columnNames, tableData, button }) => {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple ta
			ble"
			>
				<TableHead>
					<TableRow>{renderColumnNames(columnNames)}</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((row: TableDataType, index: number) => (
						<>
							{console.log(row.event, "row eve button")}
							<TableRow key={`key-table_row-${index * 2}${row}`}>
								{renderRowsTable(row.data)}

								{button && (
									<Button
										color="primary"
										variant="contained"
										onClick={() => row.event && row.event()}
										href={row?.href}
									>
										{button.label}
									</Button>
								)}
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableComp;
