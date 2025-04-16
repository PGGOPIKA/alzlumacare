import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home, Bell, HeartPulse, Settings, Menu, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

// Sidebar Component
function Sidebar({ toggleDarkMode, darkMode, isOpen, toggleSidebar }) {
  return (
    <motion.div 
      initial={{ width: 80 }} 
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed h-full bg-opacity-80 backdrop-blur-lg bg-gray-900 text-white p-4 flex flex-col items-center transition-all shadow-xl"
    >
      <button className="mb-4 text-white text-2xl" onClick={toggleSidebar}><Menu /></button>
      {isOpen && <h1 className="text-2xl font-extrabold mb-6 tracking-wider">AlzLumaCare</h1>}
      <nav className="flex flex-col gap-4 w-full">
        <NavItem to="/" icon={<Home />} label="Home" isOpen={isOpen} />
        <NavItem to="/dashboard" icon={<HeartPulse />} label="Dashboard" isOpen={isOpen} />
        <NavItem to="/alerts" icon={<Bell />} label="Alerts" isOpen={isOpen} />
        <NavItem to="/settings" icon={<Settings />} label="Settings" isOpen={isOpen} />
      </nav>
      <button 
        onClick={toggleDarkMode} 
        className="mt-auto p-3 flex items-center gap-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 w-full transition-all shadow-lg"
      >
        {darkMode ? <Sun /> : <Moon />} {isOpen && "Toggle Theme"}
      </button>
    </motion.div>
  );
}

const NavItem = ({ to, icon, label, isOpen }) => (
  <Link to={to} className="flex items-center gap-4 p-3 text-lg hover:bg-gray-700 rounded-xl w-full transition-all">
    {icon} {isOpen && <span>{label}</span>}
  </Link>
);

function Layout({ children }) {
  return <div className="ml-20 md:ml-64 p-10 bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">{children}</div>;
}

function HomePage() {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold text-blue-700">Caring for Alzheimer's Patients</h1>
        <p className="text-gray-700 text-xl mt-4">Enhancing safety and comfort with intelligent monitoring.</p>
        <motion.img 
          src="/alzheimers-care.jpg" 
          alt="Caregiving" 
          className="mt-6 mx-auto rounded-xl shadow-2xl w-full md:w-2/3"
          initial={{ scale: 0.8 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </Layout>
  );
}

function Dashboard() {
  return (
    <Layout>
      <h2 className="text-4xl font-semibold text-gray-900">Patient Monitoring Dashboard</h2>
      <Card>
        <CardContent>
          <p>Live patient activity and vital signs will be displayed here.</p>
        </CardContent>
      </Card>
    </Layout>
  );
}

function DoctorAlerts() {
  return (
    <Layout>
      <h2 className="text-4xl font-semibold text-gray-900">Doctor Consultation Alerts</h2>
      <p>Upcoming appointments and reminders will be shown here.</p>
    </Layout>
  );
}

function SettingsPage() {
  return (
    <Layout>
      <h2 className="text-4xl font-semibold text-gray-900">Settings</h2>
      <p>Customize your preferences here.</p>
    </Layout>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen transition-all"}>
      <Router>
        <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<DoctorAlerts />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

const Card = ({ children }) => (
  <div className="p-6 bg-white shadow-lg rounded-xl mt-4 border-l-8 border-blue-500 transition-all hover:shadow-2xl">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="text-gray-700 text-lg leading-relaxed">{children}</div>
);

export { Card, CardContent };
