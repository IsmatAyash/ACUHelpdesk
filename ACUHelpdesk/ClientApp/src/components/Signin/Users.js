import React, { useState, useEffect } from "react";
import { Table, Image, Container } from "react-bootstrap";
import { userService } from "../../services/userService";
import { GiCheckMark, GiCancel } from "react-icons/gi";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await userService.getUsers();
      setUsers(data);
    }
    getUsers();
  }, []);

  console.log("returned users", users);

  return (
    <Container fluid className="my-3" style={{ minHeight: "100vh" }}>
      <Table responsive="sm" bordered>
        <thead className="text-center" style={{ backgroundColor: "lightgray" }}>
          <tr>
            <th>الرقم</th>
            <th>الإسم</th>
            <th>البريد الإلكتروني</th>
            <th>الدولة</th>
            <th>الوضع</th>
            <th>كلمة مرور المفاوضات</th>
            <th>الصورة</th>
            <th>الدور</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr className="text-center">
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className="px-2">{user.country}</span>
                <Image
                  src={`/images/flags/${user.flag}.svg`}
                  roundedCircle
                  width="20rem"
                />
              </td>
              <td>{user.active ? <GiCheckMark /> : <GiCancel />}</td>
              <td>{user.negPasscode}</td>
              <td>{user.avatar}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
