import React, { useEffect, useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { Employee } from "../types/employee";
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    TableContainer,
    Paper,
} from "@mui/material";

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

    const fetchEmployees = async () => {
        const res = await employeeApi.getAll();
        const employeesArray = Array.isArray(res.data.data) ? res.data.data : [];
        setEmployees(employeesArray);
    };

    const handleDelete = async (id: string) => {
        await employeeApi.delete(id);
        fetchEmployees();
    };

    const handleUpdateClick = (emp: Employee) => {
        setCurrentEmployee(emp);
        setOpen(true);
    };

    const handleUpdateSave = async () => {
        if (currentEmployee && currentEmployee._id) {
            await employeeApi.update(currentEmployee._id, currentEmployee);
            setOpen(false);
            fetchEmployees();
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <Box
            p={{ xs: 2, sm: 3, md: 4 }}
            sx={{ width: "100%", overflowX: "hidden" }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" } }}
            >
                Employees
            </Typography>

           
            <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.map((emp: any) => (
                            <TableRow key={emp._id}>
                                <TableCell>{emp.firstName}</TableCell>
                                <TableCell>{emp.lastName}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>{emp.department?.name}</TableCell>
                                <TableCell>{emp.jobTitle}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", sm: "row" },
                                            gap: 1
                                        }}
                                    >
                                        <Button
                                            fullWidth={true}
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleUpdateClick(emp)}
                                        >
                                            Update
                                        </Button>

                                        <Button
                                            fullWidth={true}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => emp._id && handleDelete(emp._id)}
                                            disabled={!emp._id}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Update Modal */}
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Update Employee</DialogTitle>

                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="First Name"
                        fullWidth
                        value={currentEmployee?.firstName || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, firstName: e.target.value })
                        }
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={currentEmployee?.lastName || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, lastName: e.target.value })
                        }
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={currentEmployee?.email || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, email: e.target.value })
                        }
                    />
                    <TextField
                        label="Job Title"
                        fullWidth
                        value={currentEmployee?.jobTitle || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, jobTitle: e.target.value })
                        }
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeesPage;
