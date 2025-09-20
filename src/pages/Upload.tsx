import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  File, 
  CheckCircle, 
  AlertCircle,
  X,
  Tag,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  category?: string;
  summary?: string;
  tags?: string[];
}

export const Upload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || "unknown",
      status: "uploading",
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });

    toast({
      title: "Files Added",
      description: `${fileList.length} file(s) added to upload queue`,
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, progress: Math.min(progress, 100) }
          : file
      ));

      if (progress >= 100) {
        clearInterval(interval);
        // Simulate processing
        setTimeout(() => {
          setFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { 
                  ...file, 
                  status: "processing",
                  progress: 100 
                }
              : file
          ));

          // Simulate AI processing completion
          setTimeout(() => {
            setFiles(prev => prev.map(file => 
              file.id === fileId 
                ? { 
                    ...file, 
                    status: "completed",
                    category: "Contract",
                    summary: "AI-generated summary of the uploaded document. Key points and metadata have been extracted.",
                    tags: ["contract", "legal", "metro", "phase-2"]
                  }
                : file
            ));
          }, 2000);
        }, 1000);
      }
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-6 h-6" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "processing": return "text-warning";
      case "error": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Upload Documents
          </h1>
          <p className="text-muted-foreground">
            Upload and process documents with AI-powered categorization and summarization.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Tag className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Upload
          </Button>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="bg-gradient-card shadow-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="w-5 h-5 text-primary" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <UploadIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to browse</h3>
            <p className="text-muted-foreground mb-4">
              Supports: PDF, Word, Excel, Images (JPEG/PNG), and scanned documents
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Maximum file size: 20MB per file
            </p>
            
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Button asChild className="bg-gradient-primary">
              <label htmlFor="file-upload" className="cursor-pointer">
                <UploadIcon className="w-4 h-4 mr-2" />
                Browse Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Queue */}
      {files.length > 0 && (
        <Card className="bg-gradient-card shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upload Queue ({files.length})
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFiles([])}
              >
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-primary">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{file.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{file.size}</span>
                        <span className={getStatusColor(file.status)}>
                          {file.status === "uploading" && "Uploading..."}
                          {file.status === "processing" && "Processing with AI..."}
                          {file.status === "completed" && "Completed"}
                          {file.status === "error" && "Error"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "completed" && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {file.status === "error" && (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {(file.status === "uploading" || file.status === "processing") && (
                  <Progress value={file.progress} className="h-2" />
                )}

                {file.status === "completed" && (
                  <div className="space-y-3 pt-3 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Category</Label>
                        <Select defaultValue={file.category}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="HR">HR Document</SelectItem>
                            <SelectItem value="Financial">Financial Record</SelectItem>
                            <SelectItem value="Technical">Technical Report</SelectItem>
                            <SelectItem value="Compliance">Compliance Document</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Tags</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {file.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">AI Summary</Label>
                      <Textarea
                        className="mt-1"
                        value={file.summary}
                        rows={3}
                        readOnly
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit Metadata
                      </Button>
                      <Button size="sm" variant="outline">
                        View Document
                      </Button>
                      <Button size="sm" className="bg-gradient-success">
                        Save to Library
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Uploads */}
      <Card className="bg-gradient-card shadow-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Recent Uploads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Metro Phase 2 Contract.pdf", time: "2 hours ago", status: "Processed" },
              { name: "Safety Compliance Report.docx", time: "1 day ago", status: "Processed" },
              { name: "Employee Handbook Update.pdf", time: "2 days ago", status: "Processed" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">{item.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;