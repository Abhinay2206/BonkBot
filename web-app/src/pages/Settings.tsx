import { useState, useEffect } from "react";
import { User, Shield, Bell, CreditCard, LogOut, ArrowLeft, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    country: ''
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial theme on mount
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        // First get the email from token validation
        const emailResponse = await fetch('http://localhost:4000/api/auth/validate-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const emailData = await emailResponse.json();
        const userEmail = emailData.email;

        // Then use email to get user data
        const response = await fetch(`http://localhost:4000/api/user/getByEmail/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          country: data.country,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear all session data
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userData.id,
          ...userData
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          country: data.user.country,
        });
        toast.success(data.message);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/api/user/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userData.id,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        })
      });

      if (response.ok) {
        toast.success('Password updated successfully');
        setPasswords({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-8`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Profile Settings
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Manage your account settings and preferences</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} rounded-xl p-4 backdrop-blur-sm`}>
              <nav className="space-y-2">
                {[
                  { id: "personal", label: "Personal Info", icon: <User size={18} /> },
                  { id: "security", label: "Security", icon: <Shield size={18} /> },
                  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
                  { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
                  { id: "appearance", label: "Appearance", icon: <Moon size={18} /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${activeTab === item.id 
                        ? "bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white"
                        : `hover:bg-gray-700/50 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500/20 text-red-400"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} rounded-xl p-6 backdrop-blur-sm`}>
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Full Name</label>
                      <input
                        type="text"
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder="Enter your name"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email Address</label>
                      <input
                        type="email"
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder="Enter your email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone Number</label>
                      <input
                        type="tel"
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder="Enter your phone number"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Country</label>
                      <select 
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        value={userData.country}
                        onChange={(e) => setUserData({...userData, country: e.target.value})}
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={handleUpdateProfile}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Password</label>
                      <input
                        type="password"
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder="Enter current password"
                        value={passwords.oldPassword}
                        onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Password</label>
                      <input
                        type="password"
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder="Enter new password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Confirm New Password</label>
                      <input
                        type="password"
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500`}
                        placeholder="Confirm new password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={handleUpdatePassword}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-6 mt-8`}>
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Add an extra layer of security to your account</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>We'll ask for a verification code in addition to your password</p>
                      </div>
                      <button 
                        onClick={() => toast.info('2FA coming soon!')}
                        className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-200"
                      >
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      "Email notifications for trades",
                      "Price alerts",
                      "Security alerts",
                      "Newsletter and updates",
                      "Marketing communications"
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100'} rounded-lg`}>
                        <span>{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            onChange={() => toast.info('Notification preference updated')}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
                  <h3 className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Coming Soon.....</h3>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                  
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100'} rounded-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Toggle between light and dark themes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
