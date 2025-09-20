import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  Calendar,
  User,
  Tag,
  Star,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  title: string;
  category: string;
  uploader: string;
  uploadDate: string;
  size: string;
  summary: string;
  tags: string[];
  compliance: "compliant" | "expiring" | "overdue";
  favorite: boolean;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Metro Phase 2 Construction Contract",
    category: "Contract",
    uploader: "Priya Nair",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    summary: "Comprehensive construction agreement for Metro Phase 2 expansion including timeline, budget, and specifications.",
    tags: ["contract", "construction", "phase-2"],
    compliance: "compliant",
    favorite: true,
  },
  {
    id: "2",
    title: "Safety Compliance Certificate",
    category: "Compliance",
    uploader: "Suresh Kumar",
    uploadDate: "2024-01-10",
    size: "1.2 MB",
    summary: "Annual safety compliance certificate renewal documentation with inspection reports.",
    tags: ["safety", "compliance", "certificate"],
    compliance: "expiring",
    favorite: false,
  },
  {
    id: "3",
    title: "Employee Handbook 2024",
    category: "HR",
    uploader: "Anita Joseph",
    uploadDate: "2024-01-08",
    size: "5.1 MB",
    summary: "Updated employee handbook with new policies, procedures, and organizational changes.",
    tags: ["hr", "handbook", "policies"],
    compliance: "compliant",
    favorite: false,
  },
  {
    id: "4",
    title: "Financial Audit Report Q4 2023",
    category: "Financial",
    uploader: "Rajesh Kumar",
    uploadDate: "2024-01-05",
    size: "3.7 MB",
    summary: "Quarterly financial audit report with revenue analysis and expense breakdown.",
    tags: ["audit", "financial", "q4-2023"],
    compliance: "overdue",
    favorite: true,
  },
];

export const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompliance, setSelectedCompliance] = useState("all");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [filteredDocs, setFilteredDocs] = useState(mockDocuments);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDocuments(query, selectedCategory, selectedCompliance);
  };

  const filterDocuments = (query: string, category: string, compliance: string) => {
    let filtered = mockDocuments;

    if (query) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.summary.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (category !== "all") {
      filtered = filtered.filter(doc => doc.category === category);
    }

    if (compliance !== "all") {
      filtered = filtered.filter(doc => doc.compliance === compliance);
    }

    setFilteredDocs(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterDocuments(searchQuery, category, selectedCompliance);
  };

  const handleComplianceChange = (compliance: string) => {
    setSelectedCompliance(compliance);
    filterDocuments(searchQuery, selectedCategory, compliance);
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "compliant": return "bg-success text-success-foreground";
      case "expiring": return "bg-warning text-warning-foreground";
      case "overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getComplianceLabel = (compliance: string) => {
    switch (compliance) {
      case "compliant": return "✓ Compliant";
      case "expiring": return "⚠ Expiring Soon";
      case "overdue": return "✖ Overdue";
      default: return "Unknown";
    }
  };

  const toggleDocSelection = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const selectAllDocs = () => {
    setSelectedDocs(
      selectedDocs.length === filteredDocs.length 
        ? [] 
        : filteredDocs.map(doc => doc.id)
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Document Library
          </h1>
          <p className="text-muted-foreground">
            Browse, search, and manage your document collection with advanced filtering.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-soft animate-fade-in">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search documents, summaries, or tags..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Contract">Contracts</SelectItem>
                  <SelectItem value="HR">HR Documents</SelectItem>
                  <SelectItem value="Financial">Financial Records</SelectItem>
                  <SelectItem value="Compliance">Compliance Docs</SelectItem>
                  <SelectItem value="Technical">Technical Reports</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCompliance} onValueChange={handleComplianceChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Compliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedDocs.length > 0 && (
            <div className="flex items-center justify-between mt-4 p-3 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium">
                {selectedDocs.length} document(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Tag className="w-4 h-4 mr-2" />
                  Add Tags
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {filteredDocs.length} of {mockDocuments.length} documents
          </span>
          {selectedDocs.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDocs([])}
            >
              Clear Selection
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedDocs.length === filteredDocs.length && filteredDocs.length > 0}
            onCheckedChange={selectAllDocs}
          />
          <span className="text-sm text-muted-foreground">Select All</span>
        </div>
      </div>

      {/* Document Grid/List */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="bg-gradient-card shadow-soft animate-scale-in hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedDocs.includes(doc.id)}
                    onCheckedChange={() => toggleDocSelection(doc.id)}
                  />
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1">
                  {doc.favorite && (
                    <Star className="w-4 h-4 text-warning fill-current" />
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{doc.category}</Badge>
                <Badge className={getComplianceColor(doc.compliance)}>
                  {getComplianceLabel(doc.compliance)}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {doc.summary}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {doc.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {doc.uploader}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or upload new documents.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documents;