import React, { useState, useEffect } from "react";
import { getCountries } from "../../services/countryService";
import { Table, Image, Container } from "react-bootstrap";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function getC() {
      const { data } = await getCountries();
      setCountries(data);
    }
    getC();
  }, []);

  return (
    <Container fluid className="my-3" style={{ minHeight: "100vh" }}>
      <Table responsive="sm" bordered>
        <thead className="text-center" style={{ backgroundColor: "lightgray" }}>
          <tr>
            <th>الرقم</th>
            <th>الدولة</th>
            <th>العلم</th>
            <th>الرمز الصغير</th>
            <th>الرمز الكبير</th>
            <th>الإسم بالإنكليزية</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(country => (
            <tr className="text-center">
              <td>{country.id}</td>
              <td>{country.nameAR}</td>
              <td>
                <Image
                  src={`/images/flags/${country.alpha2}.svg`}
                  width="20rem"
                />
              </td>
              <td>{country.alpha2}</td>
              <td>{country.alpha3}</td>
              <td>{country.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Countries;
