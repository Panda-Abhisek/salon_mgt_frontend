import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

export function SignupForm({ className, onSubmit, loading, error: serverError, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Clear error dynamically as user fixes it
    if (fieldErrors[id]) {
      setFieldErrors(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) errors.username = "Name is required";
    if (!emailRegex.test(formData.email)) errors.email = "Please enter a valid email address";
    if (formData.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // PRO TIP: Lowercase email before sending to backend
      onSubmit({
        ...formData,
        email: formData.email.toLowerCase().trim()
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <FieldGroup className="space-y-4">

              <Field>
                <FieldLabel htmlFor="username">Full Name</FieldLabel>
                <Input
                  id="username"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.username}
                  onChange={handleChange}
                  className={fieldErrors.username ? "border-destructive" : ""}
                  aria-describedby={fieldErrors.username ? "username-error" : undefined}
                />
                {fieldErrors.username && (
                  <p id="username-error" className="text-xs font-medium text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1">
                    {fieldErrors.username}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldErrors.email ? "border-destructive" : ""}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-xs font-medium text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1">
                    {fieldErrors.email}
                  </p>
                )}
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={fieldErrors.password ? "border-destructive" : ""}
                  />
                  {fieldErrors.password && (
                    <p className="text-xs font-medium text-destructive mt-1.5">{fieldErrors.password}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={fieldErrors.confirmPassword ? "border-destructive" : ""}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-xs font-medium text-destructive mt-1.5">{fieldErrors.confirmPassword}</p>
                  )}
                </Field>
              </div>
            </FieldGroup>

            {/* General Form Error Container */}
            {serverError && (
              <div role="alert" className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm font-medium text-destructive text-center">
                {serverError}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {/* The Primary Action */}
              <Button type="submit" className="w-full font-semibold" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</> : "Create Account"}
              </Button>

              {/* The Secondary Action */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}