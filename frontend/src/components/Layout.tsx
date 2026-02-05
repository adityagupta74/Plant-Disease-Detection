import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Home, Info, Moon, Sun } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <h1 className="hidden sm:inline text-xl font-bold">
                Plant Disease Detection
              </h1>
            </div>

            {/* Nav + Toggle */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              <nav className="flex space-x-2 sm:space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "text-primary-600 bg-primary-50 dark:bg-gray-700"
                          : "hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <Leaf className="h-5 w-5 text-primary-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                
              </span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
