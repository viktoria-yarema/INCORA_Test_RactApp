import React from "react";
import TableComp from "../../components/TableComp";

const Users = () => {
	return (
		<div>
			<TableComp
				columnNames={["name", "email"]}
				tableData={[{ name: "Lola", email: "lola@mail.vp" }]}
			/>
		</div>
	);
};

export default Users;
