import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const userList = await User.list();
            setUsers(userList);
        } catch (error) {
            toast.error("Failed to load users.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await User.update(userId, { role: newRole });
            toast.success("User role updated successfully.");
            fetchUsers(); // Refresh the list
        } catch (error) {
            toast.error("Failed to update user role.");
            console.error(error);
        }
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.full_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Select
                                    defaultValue={user.role}
                                    onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            <Badge className="bg-red-100 text-red-800">Admin</Badge>
                                        </SelectItem>
                                        <SelectItem value="user">
                                            <Badge variant="secondary">User</Badge>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>{new Date(user.created_date).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}