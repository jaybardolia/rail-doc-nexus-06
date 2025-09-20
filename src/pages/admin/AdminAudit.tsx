import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Archive, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  FileText,
  Shield,
  AlertTriangle,
  Activity
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  status: "success" | "failed" | "warning";
  category: "authentication" | "document" | "admin" | "security";
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-01-15T10:30:00Z",
    user: "rajesh.kumar@kmrl.gov.in",
    action: "Document Upload",
    resource: "Metro Phase 2 Contract.pdf",
    details: "Successfully uploaded contract document with AI processing",
    ipAddress: "192.168.1.100",
    status: "success",
    category: "document"
  },
  {
    id: "2", 
    timestamp: "2024-01-15T10:25:00Z",
    user: "priya.nair@kmrl.gov.in", 
    action: "Login Attempt",
    resource: "User Authentication",
    details: "Successful login with 2FA verification",
    ipAddress: "192.168.1.101",
    status: "success", 
    category: "authentication"
  },
  {
    id: "3",
    timestamp: "2024-01-15T10:20:00Z",
    user: "unknown@external.com",
    action: "Failed Login",
    resource: "User Authentication", 
    details: "Failed login attempt - invalid credentials",
    ipAddress: "203.0.113.45",
    status: "failed",
    category: "security"
  },
  {
    id: "4",
    timestamp: "2024-01-15T10:15:00Z",
    user: "suresh.kumar@kmrl.gov.in",
    action: "Role Change",
    resource: "User: anita.joseph@kmrl.gov.in",
    details: "Changed user role from Engineer to HR",
    ipAddress: "192.168.1.102", 
    status: "success",
    category: "admin"
  },
  {
    id: "5",
    timestamp: "2024-01-15T10:10:00Z",
    user: "system",
    action: "Compliance Alert",
    resource: "Safety Certificate",
    details: "Generated alert for expiring safety certificate",
    ipAddress: "127.0.0.1",
    status: "warning",
    category: "security"
  }
];

export const AdminAudit = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-success text-success-foreground";
      case "failed": return "bg-destructive text-destructive-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication": return <User className="w-4 h-4" />;
      case "document": return <FileText className="w-4 h-4" />;
      case "admin": return <Shield className="w-4 h-4" />;
      case "security": return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "authentication": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "document": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "admin": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "security": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-muted text-muted-foreground border-muted";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Audit Logs
          </h1>
          <p className="text-muted-foreground">
            Track and monitor all system activities, user actions, and security events.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Events</p>
                <p className="text-3xl font-bold">{mockAuditLogs.length}</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success border-0 text-success-foreground shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Successful</p>
                <p className="text-3xl font-bold">{mockAuditLogs.filter(log => log.status === "success").length}</p>
              </div>
              <Shield className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-destructive shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-3xl font-bold text-destructive">{mockAuditLogs.filter(log => log.status === "failed").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border border-warning shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold text-warning">{mockAuditLogs.filter(log => log.status === "warning").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by user, action, or resource..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-primary" />
            Audit Log Entries ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredLogs.map((log) => {
            const { date, time } = formatTimestamp(log.timestamp);
            return (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className={getCategoryColor(log.category)} variant="outline">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(log.category)}
                          {log.category}
                        </div>
                      </Badge>
                      <Badge className={getStatusColor(log.status)} variant="secondary">
                        {log.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {date} at {time}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-semibold">{log.action}</h3>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{log.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{log.resource}</span>
                      </div>
                      <div>
                        IP: {log.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Archive className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No audit logs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or date range.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAudit;