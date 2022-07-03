import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ENDPOINT } from "../../api/api";
import { UserApiEnum } from "../../api/endpoints/user.api";
import TableComp from "../../components/TableComp";
import { User } from "../../entities/user.entities";
import { useFetch } from "../../hooks/useFetch";

import { ApiMethodEnum } from "../../api/models/apiMethod.enum";

const Users = () => {
	const [user, fetchUser] = useFetch<User, ApiMethodEnum.GET>("user");
	const [users, fetchUsers] = useFetch<User[], ApiMethodEnum.GET>("users");


	useEffect(() => {
		fetchUsers({searchQuery:  undefined});
	}, []);

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
