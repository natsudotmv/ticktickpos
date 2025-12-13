import { useState } from 'react'
import http from '@/api/http'
import { useAuth } from '@/context/AuthContext'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectGroup,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'

const USERS = [
    "Admin",
    "Cashier",
    "Manager",
    "Staff",
];

const LoginPage = () => {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !pin.length !== 6) {
            setError("Please select a user and enter 6-digit PIN.");
            return;
        }
        
        try {
            setLoading(true);

            const response = await http.post('/auth/login', {
                username,
                pin,
            });

            const { token } = response.data;
            login(token);
        } catch (err) {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted rounded-sm">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Login to POS</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label>User</Label>
                            <Select onValueChange={setUsername}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select User" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {USERS.map((user) => (
                                            <SelectItem key={user} value={user}>
                                                {user}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label>PIN</Label>
                            <Input
                                type="password"
                                inputMode="numeric"
                                maxLength={6}
                                value={pin}
                                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                placeholder="******"
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage