import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Download, 
  Calendar, 
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Users
} from "lucide-react";

export const Reports = () => {
  const reports = [
    {
      id: "1",
      name: "Monthly Document Summary",
      description: "Comprehensive overview of document uploads and processing",
      type: "PDF",
      generated: "2024-01-15",
      size: "2.4 MB",
      status: "ready"
    },
    {
      id: "2", 
      name: "Compliance Dashboard Report",
      description: "Detailed compliance status across all categories",
      type: "Excel",
      generated: "2024-01-10",
      size: "1.8 MB",
      status: "ready"
    },
    {
      id: "3",
      name: "User Activity Analytics",
      description: "User engagement and system usage statistics",
      type: "PDF",
      generated: "2024-01-08",
      size: "3.2 MB", 
      status: "generating"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports and analyze system performance metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-primary">
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Document Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Reports</p>
                    <p className="text-3xl font-bold">247</p>
                  </div>
                  <FileText className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-success border-0 text-success-foreground shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">This Month</p>
                    <p className="text-3xl font-bold">42</p>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="text-3xl font-bold text-warning">8</p>
                  </div>
                  <Calendar className="w-8 h-8 text-warning opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                    <p className="text-3xl font-bold text-primary">1,567</p>
                  </div>
                  <Download className="w-8 h-8 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{report.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Generated: {new Date(report.generated).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">• {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "ready" ? (
                      <Badge className="bg-success text-success-foreground">Ready</Badge>
                    ) : (
                      <Badge variant="secondary">Generating...</Badge>
                    )}
                    <Button size="sm" variant="outline" disabled={report.status !== "ready"}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Document Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Document Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed document analytics and trends would be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <PieChart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Compliance Reports</h3>
                <p className="text-muted-foreground">
                  Comprehensive compliance reporting and analytics would be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">User Analytics</h3>
                <p className="text-muted-foreground">
                  User activity reports and system usage analytics would be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;