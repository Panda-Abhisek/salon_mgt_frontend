import { Link } from "react-router-dom"; 
import { Loader2, Eye, EyeOff } from "lucide-react"; 
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox"; // Assuming you have a checkbox component

export function LoginForm({ className, onSubmit, loading, error: serverError, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (setter, id) => (e) => {
    setter(e.target.value);
    if (fieldErrors[id]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const errors = {};
    if (!email.includes("@")) errors.email = "Please enter a valid email address.";
    if (!password) errors.password = "Password is required.";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ 
        email: email.toLowerCase().trim(), 
        password 
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Choose your preferred login method
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            {/* Social Logins - Grid layout for better space usage */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.778 8.20793C15.3053 8.1711 14.7974 8.28434 14.0197 8.58067C14.085 8.55577 13.2775 8.87173 13.0511 8.95077C12.5494 9.12593 12.1364 9.22198 11.6734 9.22198C11.2151 9.22198 10.7925 9.13042 10.3078 8.96683C10.1524 8.91441 9.99616 8.8564 9.80283 8.7809C9.71993 8.74852 9.41997 8.62947 9.3544 8.60379C8.70626 8.34996 8.34154 8.25434 8.03885 8.26181C6.88626 8.2765 5.79557 8.9421 5.16246 10.0442C3.87037 12.2875 4.58583 16.3428 6.47459 19.075C7.4802 20.5189 8.03062 21.035 8.25199 21.0279C8.4743 21.0183 8.63777 20.9713 9.03567 20.8026C9.11485 20.7689 9.11485 20.7689 9.202 20.7317C10.2077 20.3032 10.9118 20.114 11.9734 20.114C12.9944 20.114 13.6763 20.2997 14.6416 20.7159C14.7302 20.7542 14.7302 20.7542 14.8097 20.7884C15.2074 20.9588 15.3509 20.9962 15.6016 20.9902C15.9591 20.9846 16.4003 20.5726 17.3791 19.1362C17.6471 18.7447 17.884 18.3333 18.0895 17.9168C17.9573 17.8077 17.826 17.6917 17.6975 17.5693C16.4086 16.3408 15.6114 14.6845 15.5895 12.6391C15.5756 11.0186 16.1057 9.61487 16.999 8.45797C16.6293 8.3142 16.2216 8.23805 15.778 8.20793ZM15.9334 6.21398C16.6414 6.26198 18.6694 6.47798 19.9894 8.40998C19.8814 8.46998 17.5654 9.81397 17.5894 12.622C17.6254 15.982 20.5294 17.098 20.5654 17.11C20.5414 17.194 20.0974 18.706 19.0294 20.266C18.1054 21.622 17.1454 22.966 15.6334 22.99C14.1454 23.026 13.6654 22.114 11.9734 22.114C10.2694 22.114 9.74138 22.966 8.33738 23.026C6.87338 23.074 5.76938 21.562 4.83338 20.218C2.92538 17.458 1.47338 12.442 3.42938 9.04597C4.40138 7.35397 6.12938 6.28598 8.01338 6.26198C9.44138 6.22598 10.7974 7.22198 11.6734 7.22198C12.5374 7.22198 14.0854 6.06998 15.9334 6.21398ZM14.7934 4.38998C14.0134 5.32598 12.7414 6.05798 11.5054 5.96198C11.3374 4.68998 11.9614 3.35798 12.6814 2.52998C13.4854 1.59398 14.8294 0.897976 15.9454 0.849976C16.0894 2.14598 15.5734 3.45398 14.7934 4.38998Z"></path></svg>
                {/* Apple */}
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg>
                {/* Google */}
              </Button>
            </div>

            <FieldSeparator className="text-muted-foreground text-xs uppercase">Or continue with</FieldSeparator>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="username"
                    placeholder="name@example.com"
                    value={email}
                    onChange={handleInputChange(setEmail, "email")}
                    className={fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {fieldErrors.email && <p className="text-xs font-medium text-destructive mt-1">{fieldErrors.email}</p>}
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:underline underline-offset-4">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={handleInputChange(setPassword, "password")}
                      className={cn("pr-10", fieldErrors.password ? "border-destructive focus-visible:ring-destructive" : "")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-xs font-medium text-destructive mt-1">{fieldErrors.password}</p>}
                </Field>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
              </FieldGroup>

              {serverError && (
                <div role="alert" className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm font-medium text-destructive text-center">
                  {serverError}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Signing in..." : "Login"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}