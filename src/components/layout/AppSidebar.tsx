import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Upload,
  FileText,
  Shield,
  TrendingUp,
  Settings,
  HelpCircle,
  Home,
  Users,
  Calendar,
  Archive,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
    badge: null,
  },
  {
    title: "Upload Documents",
    icon: Upload,
    path: "/upload",
    badge: null,
  },
  {
    title: "Document Library", 
    icon: FileText,
    path: "/documents",
    badge: "1,247",
  },
  {
    title: "Compliance Center",
    icon: Shield,
    path: "/compliance",
    badge: "3",
    badgeVariant: "warning" as const,
  },
  {
    title: "Analytics & Reports",
    icon: TrendingUp,
    path: "/reports",
    badge: null,
  },
];

const adminItems = [
  {
    title: "User Management",
    icon: Users,
    path: "/admin/users",
    badge: null,
  },
  {
    title: "System Settings",
    icon: Settings,
    path: "/admin/settings",
    badge: null,
  },
  {
    title: "Audit Logs",
    icon: Archive,
    path: "/admin/audit",
    badge: null,
  },
];

const supportItems = [
  {
    title: "Help & Support",
    icon: HelpCircle,
    path: "/help",
    badge: null,
  },
];

export const AppSidebar = () => {
  const { t } = useTranslation();
  const { state } = useSidebar();
  const location = useLocation();
  // Mock user role - would come from auth context
  const userRole = "Admin";
  const showAdminTools = userRole === "Admin";

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const getItemClassName = (path: string) => {
    const isActive = isActivePath(path);
    return `${
      isActive
        ? "bg-primary text-primary-foreground hover:bg-primary-hover"
        : "hover:bg-accent text-foreground"
    } transition-colors`;
  };

  // Translated navigation items
  const translatedNavigationItems = [
    {
      title: t('dashboard'),
      icon: Home,
      path: "/",
      badge: null,
    },
    {
      title: t('upload'),
      icon: Upload,
      path: "/upload",
      badge: null,
    },
    {
      title: t('documents'),
      icon: FileText,
      path: "/documents",
      badge: "1,247",
    },
    {
      title: t('compliance'),
      icon: Shield,
      path: "/compliance",
      badge: "3",
      badgeVariant: "warning" as const,
    },
    {
      title: t('reports'),
      icon: TrendingUp,
      path: "/reports",
      badge: null,
    },
  ];

  const translatedAdminItems = [
    {
      title: "User Management",
      icon: Users,
      path: "/admin/users",
      badge: null,
    },
    {
      title: "System Settings",
      icon: Settings,
      path: "/admin/settings",
      badge: null,
    },
    {
      title: "Audit Logs",
      icon: Archive,
      path: "/admin/audit",
      badge: null,
    },
  ];

  const translatedSupportItems = [
    {
      title: t('help'),
      icon: HelpCircle,
      path: "/help",
      badge: null,
    },
  ];

  return (
    <Sidebar className="border-r border-border bg-gradient-card animate-slide-in shadow-soft">
      <SidebarContent className="p-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium text-xs uppercase tracking-wide">
            {t('dashboard')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {translatedNavigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild className={getItemClassName(item.path)}>
                    <NavLink to={item.path} className="flex items-center gap-3 p-3 rounded-lg transition-all">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {state !== "collapsed" && (
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={item.badgeVariant || "secondary"}
                              className="text-xs bg-accent text-accent-foreground"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Tools */}
        {showAdminTools && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground font-medium text-xs uppercase tracking-wide">
              {t('administration')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {translatedAdminItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={getItemClassName(item.path)}>
                      <NavLink to={item.path} className="flex items-center gap-3 p-3 rounded-lg transition-all">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {state !== "collapsed" && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium text-xs uppercase tracking-wide">
            {t('support')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {translatedSupportItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild className={getItemClassName(item.path)}>
                    <NavLink to={item.path} className="flex items-center gap-3 p-3 rounded-lg transition-all">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {state !== "collapsed" && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};