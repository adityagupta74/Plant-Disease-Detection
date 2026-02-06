import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Home, Info, Moon, Sun, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const navigation = [
    { name: t("nav.home"), href: "/", icon: Home },
    { name: t("nav.about"), href: "/about", icon: Info },
  ];

  const changeLanguage = (lang: "en" | "hi" | "mr") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setLangOpen(false);
  };

  const currentLang =
    i18n.language === "hi"
      ? "हिंदी"
      : i18n.language === "mr"
      ? "मराठी"
      : "English";

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* ================= Header ================= */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <h1 className="hidden sm:inline text-xl font-bold">
                {t("LeafGuard")}
              </h1>
            </div>

            {/* Navigation + Controls */}
            <div className="flex items-center space-x-3 sm:space-x-4">

              {/* Navigation */}
              <nav className="flex space-x-2 sm:space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.href}
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

              {/* 🌐 Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm rounded-md
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  🌐 {currentLang}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {langOpen && (
                  <div
                    className="absolute right-0 mt-2 w-32 rounded-md shadow-lg
                               bg-white dark:bg-gray-800 border
                               border-gray-200 dark:border-gray-700 z-50"
                  >
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                        ${i18n.language === "en" && "font-semibold text-primary-600"}`}
                    >
                      English
                    </button>

                    <button
                      onClick={() => changeLanguage("hi")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                        ${i18n.language === "hi" && "font-semibold text-primary-600"}`}
                    >
                      हिंदी
                    </button>

                    <button
                      onClick={() => changeLanguage("mr")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                        ${i18n.language === "mr" && "font-semibold text-primary-600"}`}
                    >
                      मराठी
                    </button>
                  </div>
                )}
              </div>

              {/* 🌙 Dark Mode Toggle */}
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

      {/* ================= Main ================= */}
      <main className="flex-1 transition-colors duration-300">
        {children}
      </main>

      {/* ================= Footer ================= */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-sm text-gray-600 dark:text-gray-400 text-center">
          © 2026 {t("LeafGuard Team")}
        </div>
      </footer>

    </div>
  );
}
