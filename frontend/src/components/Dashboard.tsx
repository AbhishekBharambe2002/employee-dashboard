"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";

import { Employee } from "../types/employee";
import { Department } from "../types/department";
import { employeeApi } from "../api/employeeApi";
import { departmentApi } from "../api/departmentApi";

// Recharts
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const Dashboard = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Employees API returns: { data: [...] }
            const empRes = await employeeApi.getAll();
            const empData = empRes.data.data;

            // Departments API returns: [...]
            const depRes = await departmentApi.getAll();
            const depData = depRes.data;

            setEmployees(empData || []);
            setDepartments(depData || []);

           
            const computedStats = depData.map((d: Department) => ({
                name: d.name,
                count: empData.filter(
                    (e: Employee) => e.department?._id === d._id
                ).length,
            }));

            setStats(computedStats);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Stat Cards */}
                    <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                sx={{
                                    width: "240px",
                                    borderRadius: "16px",
                                    padding: 2,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{stat.name}</Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{ mt: 1, fontWeight: "bold" }}
                                    >
                                        {stat.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    {/* Charts Section */}
                    <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
                        {/* Bar Chart */}
                        <Card
                            sx={{
                                width: "600px",
                                height: "350px",
                                padding: 2,
                                borderRadius: "16px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Employees by Department (Bar Chart)
                            </Typography>
                            <ResponsiveContainer width="100%" height="85%">
                                <BarChart data={stats}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#0088FE" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>

                        {/* Pie Chart */}
                        <Card
                            sx={{
                                width: "400px",
                                height: "350px",
                                padding: 2,
                                borderRadius: "16px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Employees by Department (Pie Chart)
                            </Typography>
                            <ResponsiveContainer width="100%" height="85%">
                                <PieChart>
                                    <Pie
                                        dataKey="count"
                                        data={stats}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={110}
                                        label
                                    >
                                        {stats.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </Box>

                    {/* Employee Table */}
                    <Card
                        sx={{
                            p: 2,
                            borderRadius: "16px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Employee Overview
                        </Typography>

                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={th}>Name</th>
                                    <th style={th}>Email</th>
                                    <th style={th}>Department</th>

                                </tr>
                            </thead>

                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp._id}>
                                        <td style={td}>
                                            {emp.firstName} {emp.lastName}
                                        </td>
                                        <td style={td}>{emp.email}</td>
                                        <td style={td}>
                                            {emp.department?.name ?? "No Department"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </>
            )}
        </Box>
    );
};

const th: React.CSSProperties = {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
};

const td: React.CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
};

export default Dashboard;
