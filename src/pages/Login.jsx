import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import { LoginForm } from "../components/login-form"
import { GalleryVerticalEnd } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const { login, loading, hasRole } = useAuth()

  const handleLogin = async (credentials) => {
    setError(null)
    try {
      await login(credentials)

      if (hasRole("ROLE_SALON_ADMIN") || hasRole("ROLE_STAFF")) {
        navigate("/home", { replace: true })
      } else {
        navigate("/salons", { replace: true })
      }

    } catch {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Qikut Inc.
        </a>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default Login
