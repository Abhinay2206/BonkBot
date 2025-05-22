import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  country?: string;
  phoneCode?: string;
}

interface CountryData {
  name: string;
  code: string;
  phoneCode: string;
}

const countries: CountryData[] = [
  { name: 'United States', code: 'US', phoneCode: '+1' },
  { name: 'United Kingdom', code: 'GB', phoneCode: '+44' },
  { name: 'India', code: 'IN', phoneCode: '+91' },
  { name: 'Canada', code: 'CA', phoneCode: '+1' },
  { name: 'Australia', code: 'AU', phoneCode: '+61' },
  // Add more countries as needed
];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    country: '',
    phoneCode: ''
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      const selectedCountry = countries.find(c => c.name === value);
      setFormData(prev => ({
        ...prev,
        country: value,
        phoneCode: selectedCountry?.phoneCode || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : {
            ...formData,
            phone: formData.phoneCode ? formData.phoneCode + formData.phone : formData.phone 
          };

      const { data } = await axios.post<{ token: string }>(`http://localhost:4000${endpoint}`, payload);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    try {
      window.location.href = `http://localhost:4000/api/auth/${provider}`;
    } catch {
      setError(`Failed to initialize ${provider} login`);
    }
  };

  const renderAuthButton = (provider: 'google' | 'apple') => (
    <button
      type="button"
      onClick={() => handleOAuthLogin(provider)}
      className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
    >
      <img 
        src={`/${provider}-icon.svg`} 
        alt={provider} 
        className="h-6 w-6 mr-3" 
      />
      Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  );

  const renderFormField = (
    label: string, 
    name: keyof LoginFormData, 
    type: string = 'text',
    required: boolean = true
  ) => {
    if (name === 'country') {
      return (
        <div className="space-y-2">
          <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
          <select
            id={name}
            name={name}
            required={required}
            value={formData[name]}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (name === 'phone') {
      return (
        <div className="space-y-2">
          <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
          <div className="mt-1 flex rounded-lg shadow-sm">
            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium">
              {formData.phoneCode || '+1'}
            </span>
            <input
              id={name}
              name={name}
              type="tel"
              required={required}
              value={formData[name]}
              onChange={handleInputChange}
              className="flex-1 block w-full px-4 py-3 rounded-none rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="123-456-7890"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={formData[name]}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl">
        <div>
          <h2 className="text-center text-4xl font-bold text-gray-900 tracking-tight">
            {isLogin ? 'Welcome back!' : 'Create account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Let's get you signed in" : "Join us today"}
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            {['Login', 'Sign Up'].map((text, index) => (
              <button
                key={text}
                onClick={() => setIsLogin(index === 0)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                  (index === 0 ? isLogin : !isLogin) 
                    ? 'text-white bg-blue-600 shadow-md hover:bg-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {renderAuthButton('google')}
          {renderAuthButton('apple')}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-6">
              {renderFormField('Name', 'name')}
              {renderFormField('Country', 'country')}
              {renderFormField('Phone Number', 'phone', 'tel')}
            </div>
          )}

          {renderFormField('Email address', 'email', 'email')}
          {renderFormField('Password', 'password', 'password')}

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
