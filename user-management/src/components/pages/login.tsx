import { FormEvent, useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authentication';
import { useThemeStore } from '../../store/theme';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { darkMode } = useThemeStore();

    const setToken = useAuthStore((state) => state.setToken);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Fill required fields.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: { email, password } }),
            });
              
            const data = await response.json();
            const { accessToken, expiresIn } = data.result.data;
            setToken(accessToken, expiresIn);
            if(accessToken === undefined)
                setError("Invalid credentials");

        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <form
                onSubmit={handleLogin}
                className={`w-full max-w-xs rounded-xl shadow-lg p-8 space-y-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
                <h1 className={`text-xl font-semibold text-center ${darkMode ? 'text-white' : 'text-black'}`}>Login</h1>

                {error && (
                    <p className={`text-sm text-center ${darkMode ? 'text-red-300' : 'text-red-500'}`}>{error}</p>
                )}

                <div>
                    <label htmlFor="email" className={`block text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required = {false}
                    />
                </div>

                <div>
                    <label htmlFor="password" className={`block text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required = {false}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={20} className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                            ) : (
                                <Eye size={20} className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className={`w-auto font-bold py-2 px-4 rounded cursor-pointer ${darkMode ? 'text-white bg-primary-dark'   : 'text-white bg-primary'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
