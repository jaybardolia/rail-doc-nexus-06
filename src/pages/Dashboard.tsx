import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardStats, QuickActions, RecentActivity } from "@/components/dashboard/DashboardWidgets";
import { DocumentCategoriesChart, UploadTrendsChart, ComplianceChart } from "@/components/dashboard/DashboardCharts";
import { Upload, Search, FileText, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Dashboard = () => {
  const { t } = useLanguage();
  
  // Mock user data - would come from auth context
  const user = {
    name: "Rajesh Kumar",
    role: "Admin",
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            {t('welcome')}, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your documents today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-primary hover:bg-primary-hover shadow-soft">
            <Upload className="w-4 h-4 mr-2" />
            {t('upload_document')}
          </Button>
          <Button variant="outline" className="shadow-soft">
            <Search className="w-4 h-4 mr-2" />
            Search Documents
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <DashboardStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentCategoriesChart />
        <UploadTrendsChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ComplianceChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* System Status Banner */}
      <Card className="bg-gradient-success border-0 text-success-foreground shadow-soft animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">System Status: All Systems Operational</h3>
                <p className="text-sm opacity-90">
                  All document processing services are running normally. Last backup: Today at 3:00 AM
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Healthy
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;