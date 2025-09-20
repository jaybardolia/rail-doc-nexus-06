import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar,
  FileText,
  Download,
  Bell,
  Users,
  TrendingUp
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  status: "compliant" | "expiring" | "overdue";
  dueDate: string;
  assignee: string;
  description: string;
  progress?: number;
}

const complianceItems: ComplianceItem[] = [
  {
    id: "1",
    title: "Safety Training Certification Renewal",
    category: "Safety",
    status: "expiring",
    dueDate: "2024-02-15",
    assignee: "Suresh Kumar",
    description: "Annual safety training certification for all operational staff",
    progress: 75,
  },
  {
    id: "2",
    title: "Environmental Impact Assessment",
    category: "Environmental",
    status: "overdue",
    dueDate: "2024-01-20",
    assignee: "Priya Nair",
    description: "Required environmental compliance report for Phase 2 expansion",
  },
  {
    id: "3",
    title: "Fire Safety Certificate",
    category: "Safety",
    status: "compliant",
    dueDate: "2024-06-30",
    assignee: "Anita Joseph",
    description: "Fire safety compliance certificate for all metro stations",
  },
  {
    id: "4",
    title: "Data Protection Audit",
    category: "Legal",
    status: "expiring",
    dueDate: "2024-02-28",
    assignee: "Rajesh Kumar",
    description: "Annual data protection and privacy compliance audit",
    progress: 45,
  },
];

export const Compliance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useTranslation();
  
  const getStatusStats = () => {
    const compliant = complianceItems.filter(item => item.status === "compliant").length;
    const expiring = complianceItems.filter(item => item.status === "expiring").length;
    const overdue = complianceItems.filter(item => item.status === "overdue").length;
    
    return { compliant, expiring, overdue, total: complianceItems.length };
  };

  const stats = getStatusStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-success";
      case "expiring": return "text-warning";
      case "overdue": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-success text-success-foreground";
      case "expiring": return "bg-warning text-warning-foreground";
      case "overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "compliant": return "✓ Compliant";
      case "expiring": return "⚠ Expiring Soon";
      case "overdue": return "✖ Overdue";
      default: return "Unknown";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const compliancePercentage = Math.round((stats.compliant / stats.total) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            {t('compliance_center')}
          </h1>
          <p className="text-muted-foreground">
            Monitor compliance status, track deadlines, and manage regulatory requirements.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            {t('export_report')}
          </Button>
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            {t('set_alerts')}
          </Button>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-success border-0 text-success-foreground shadow-soft animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('compliant')}</p>
                <p className="text-3xl font-bold">{stats.compliant}</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-warning shadow-soft animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('expiring_soon')}</p>
                <p className="text-3xl font-bold text-warning">{stats.expiring}</p>
              </div>
              <Clock className="w-8 h-8 text-warning opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-destructive shadow-soft animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('overdue')}</p>
                <p className="text-3xl font-bold text-destructive">{stats.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-soft animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('overall_score')}</p>
                <p className="text-3xl font-bold">{compliancePercentage}%</p>
              </div>
              <Shield className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="alerts">{t('active_alerts')}</TabsTrigger>
          <TabsTrigger value="timeline">{t('timeline')}</TabsTrigger>
          <TabsTrigger value="reports">{t('reports')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Overview */}
          <Card className="bg-gradient-card shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Compliance Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Compliance</span>
                  <span className="text-sm text-muted-foreground">{compliancePercentage}%</span>
                </div>
                <Progress value={compliancePercentage} className="h-3" />
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{stats.compliant}</div>
                    <div className="text-sm text-muted-foreground">Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{stats.expiring}</div>
                    <div className="text-sm text-muted-foreground">Expiring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
                    <div className="text-sm text-muted-foreground">Overdue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Items List */}
          <Card className="bg-gradient-card shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                All Compliance Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge className={getStatusBadgeColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {item.assignee}
                      </div>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <div className="text-muted-foreground">
                      {getDaysUntilDue(item.dueDate) > 0 
                        ? `${getDaysUntilDue(item.dueDate)} days left`
                        : `${Math.abs(getDaysUntilDue(item.dueDate))} days overdue`
                      }
                    </div>
                  </div>

                  {item.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Status
                    </Button>
                    {item.status === "expiring" && (
                      <Button size="sm" className="bg-gradient-primary">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="bg-gradient-card shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Active Compliance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems
                  .filter(item => item.status === "expiring" || item.status === "overdue")
                  .map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border-l-4 ${
                      item.status === "overdue" 
                        ? "border-l-destructive bg-destructive/10" 
                        : "border-l-warning bg-warning/10"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.status === "overdue" 
                              ? `Overdue by ${Math.abs(getDaysUntilDue(item.dueDate))} days`
                              : `Expires in ${getDaysUntilDue(item.dueDate)} days`
                            }
                          </p>
                        </div>
                        <Button size="sm" className="bg-gradient-primary">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-gradient-card shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Compliance Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Timeline View</h3>
                <p className="text-muted-foreground">
                  Gantt chart view of compliance deadlines and milestones would be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-gradient-card shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Monthly Compliance Summary", date: "January 2024", type: "PDF" },
                  { name: "Safety Audit Report", date: "December 2023", type: "PDF" },
                  { name: "Environmental Compliance", date: "December 2023", type: "Excel" },
                  { name: "Data Protection Audit", date: "November 2023", type: "PDF" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{report.type}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Compliance;