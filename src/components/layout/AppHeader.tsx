import { useState } from "react";
import { Search, Mic, Bell, ChevronDown, Settings, LogOut, Globe, Moon, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

export const AppHeader = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, message: "New compliance alert: Contract XYZ expires in 7 days", type: "warning" },
    { id: 2, message: "Document processing complete for Project ABC", type: "success" },
    { id: 3, message: "Monthly report generated successfully", type: "info" },
  ]);

  const unreadCount = notifications.filter(n => n.type === "warning").length;

  const languageOptions: { value: 'en' | 'hi' | 'ml'; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { value: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  ];

  return (
    <header className="h-16 border-b border-border bg-gradient-primary shadow-soft">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-primary-foreground hover:bg-primary-hover" />
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">K</span>
            </div>
            <div className="text-primary-foreground">
              <h1 className="font-bold text-lg">KMRL</h1>
              <p className="text-xs opacity-90">DocuManager</p>
            </div>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-10 bg-background/95 border-0 focus:ring-2 focus:ring-accent transition-all"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-accent/20"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-hover">
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{i18n.language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languageOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    i18n.changeLanguage(option.value);
                    try { localStorage.setItem('kmrl-language', option.value); } catch {}
                  }}
                  className={i18n.language === option.value ? "bg-accent" : ""}
                >
                  <span className="mr-2">{option.flag}</span>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-primary-foreground hover:bg-primary-hover">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t('notifications')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <Badge variant={notification.type === "warning" ? "warning" : "secondary"} className="text-xs">
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">{notification.message}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-primary-foreground hover:bg-primary-hover">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs opacity-80">Administrator</p>
                </div>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                {t('settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};