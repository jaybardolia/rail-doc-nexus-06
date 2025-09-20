import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  Upload,
  TrendingUp,
  Shield,
  Users,
  Calendar,
  Download,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  gradient?: string;
}

const StatCard = ({ title, value, change, changeType, icon: Icon, gradient }: StatCardProps) => (
  <Card className={`${gradient} border-0 shadow-soft animate-scale-in`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <Badge
              variant={changeType === "positive" ? "default" : changeType === "negative" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {change}
            </Badge>
          )}
        </div>
        <Icon className="w-8 h-8 text-primary opacity-80" />
      </div>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  const stats = [
    {
      title: "Total Documents",
      value: "12,847",
      change: "+247 this week",
      changeType: "positive" as const,
      icon: FileText,
      gradient: "bg-gradient-card",
    },
    {
      title: "Compliance Alerts",
      value: "23",
      change: "3 critical",
      changeType: "negative" as const,
      icon: Shield,
      gradient: "bg-gradient-card",
    },
    {
      title: "Active Users",
      value: "156",
      change: "+12 this month",
      changeType: "positive" as const,
      icon: Users,
      gradient: "bg-gradient-card",
    },
    {
      title: "Processing Queue",
      value: "8",
      change: "2 pending OCR",
      changeType: "neutral" as const,
      icon: Upload,
      gradient: "bg-gradient-card",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export const QuickActions = () => {
  const actions = [
    {
      title: "Upload Documents",
      description: "Add new files to the system",
      icon: Upload,
      variant: "default" as const,
      action: () => console.log("Upload"),
    },
    {
      title: "Generate Report",
      description: "Create compliance summary",
      icon: Download,
      variant: "outline" as const,
      action: () => console.log("Report"),
    },
    {
      title: "View Alerts",
      description: "Check critical compliance items",
      icon: AlertTriangle,
      variant: "outline" as const,
      action: () => console.log("Alerts"),
    },
  ];

  return (
    <Card className="bg-gradient-card shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={action.action}
            >
              <action.icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-xs opacity-80">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const RecentActivity = () => {
  const activities = [
    {
      action: "Document uploaded",
      item: "Metro Phase 2 Contract Agreement",
      user: "Priya Nair",
      time: "2 minutes ago",
      type: "upload",
    },
    {
      action: "Compliance alert triggered",
      item: "Safety Certificate Expiry",
      user: "System",
      time: "15 minutes ago",
      type: "alert",
    },
    {
      action: "Report generated",
      item: "Monthly Financial Summary",
      user: "Suresh Kumar",
      time: "1 hour ago",
      type: "report",
    },
    {
      action: "Document reviewed",
      item: "Employee Handbook Update",
      user: "Anita Joseph",
      time: "2 hours ago",
      type: "review",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="w-4 h-4 text-primary" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "report":
        return <Download className="w-4 h-4 text-success" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="bg-gradient-card shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="p-2 rounded-full bg-muted">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-sm text-primary truncate">{activity.item}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{activity.user}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};