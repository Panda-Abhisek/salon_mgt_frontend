import { useAuth } from "@/auth/AuthContext";
import PageWrapper from "@/components/common/PageWrapper";
import { SignupForm } from "../components/signup-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "@/api/auth.api";
import { toast } from "sonner";
import { GalleryVerticalEnd } from "lucide-react";

export default function Signup() {
    const { loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const handleSignup = async (values) => {
        try {
            console.log(values);
            await registerUser(values);
            toast.success("Account created successfully");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Signup failed");
        }
    };

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Qikut Inc.
                </a>
                <SignupForm onSubmit={handleSignup} loading={loading} error={error} />
            </div>
        </div>
    );
}
