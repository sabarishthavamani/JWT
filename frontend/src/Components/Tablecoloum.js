import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { adminDelete, adminDisplay } from "../action/Adminaction";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tablecoloum() {
  const [getdata, setgetdata] = useState([]);
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      let { status, result } = await adminDisplay();
      if (status === true) {
        setgetdata(result);
        console.log("setgetdata", setgetdata);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Edite = async (id) => {
    nav(`/Edit/${id}`);
  };

  const Delete = async (id) => {
    try {
      let { status, result } = await adminDelete(id);
      if (status === true) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell>USERNAME</StyledTableCell>
            <StyledTableCell>EMAIL</StyledTableCell>
            <StyledTableCell>PASSWORD</StyledTableCell>
            <StyledTableCell>EDIT</StyledTableCell>
            <StyledTableCell>DELETE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getdata.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{item.username}</StyledTableCell>
              <StyledTableCell>{item.Email}</StyledTableCell>
              <StyledTableCell>{item.Password}</StyledTableCell>
              <StyledTableCell>
                <Button onClick={() => Edite(item._id)}>Edit</Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button onClick={() => Delete(item._id)}>Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
