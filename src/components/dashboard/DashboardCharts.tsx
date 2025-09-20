import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line 
} from "recharts";
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";

// Document Categories Distribution
const documentCategories = [
  { name: "Contracts", value: 3847, color: "#1E90FF" },
  { name: "HR Documents", value: 2156, color: "#28A745" },
  { name: "Financial Records", value: 1892, color: "#FFC107" },
  { name: "Technical Reports", value: 1567, color: "#DC3545" },
  { name: "Compliance Docs", value: 1234, color: "#6F42C1" },
  { name: "Others", value: 2151, color: "#6C757D" },
];

// Upload Trends (Last 6 months)
const uploadTrends = [
  { month: "Apr", uploads: 456, processed: 445 },
  { month: "May", uploads: 623, processed: 615 },
  { month: "Jun", uploads: 789, processed: 780 },
  { month: "Jul", uploads: 567, processed: 559 },
  { month: "Aug", uploads: 834, processed: 825 },
  { month: "Sep", uploads: 692, processed: 688 },
];

// Compliance Status
const complianceData = [
  { status: "Compliant", count: 89, color: "#28A745" },
  { status: "Expiring Soon", count: 23, color: "#FFC107" },
  { status: "Overdue", count: 8, color: "#DC3545" },
];

export const DocumentCategoriesChart = () => {
  const total = documentCategories.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-gradient-card shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-primary" />
          Document Categories
          <Badge variant="secondary" className="ml-auto">
            {total.toLocaleString()} Total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={documentCategories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {documentCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value.toLocaleString(), "Documents"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {documentCategories.map((category) => (
            <div key={category.name} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
              <span className="text-muted-foreground ml-auto">
                {category.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const UploadTrendsChart = () => {
  return (
    <Card className="bg-gradient-card shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Upload Trends
          <Badge variant="outline" className="ml-auto">
            Last 6 Months
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={uploadTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-muted-foreground"
              />
              <YAxis className="text-muted-foreground" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="uploads" 
                stroke="#1E90FF" 
                strokeWidth={3}
                dot={{ fill: "#1E90FF", strokeWidth: 2, r: 6 }}
                name="Uploads"
              />
              <Line 
                type="monotone" 
                dataKey="processed" 
                stroke="#28A745" 
                strokeWidth={3}
                dot={{ fill: "#28A745", strokeWidth: 2, r: 6 }}
                name="Processed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const ComplianceChart = () => {
  return (
    <Card className="bg-gradient-card shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={complianceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" className="text-muted-foreground" />
              <YAxis 
                type="category" 
                dataKey="status" 
                className="text-muted-foreground"
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {complianceData.map((item) => (
            <div key={item.status} className="text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm font-medium">{item.status}</p>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};