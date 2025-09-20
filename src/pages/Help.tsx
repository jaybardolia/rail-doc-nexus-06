import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HelpCircle, 
  Search, 
  FileText, 
  Upload, 
  Shield, 
  Users,
  Mail,
  Phone,
  MessageCircle,
  Book,
  Video,
  ExternalLink
} from "lucide-react";

export const Help = () => {
  const faqItems = [
    {
      question: "How do I upload documents to the system?",
      answer: "Navigate to the Upload section, then either drag and drop your files or click 'Browse Files' to select documents. The system supports PDF, Word, Excel, and image files up to 20MB each."
    },
    {
      question: "What file formats are supported?",
      answer: "KMRL DocuManager supports PDF, Word documents (.doc, .docx), Excel spreadsheets (.xls, .xlsx), and image files (JPEG, PNG). Scanned documents are also supported with OCR processing."
    },
    {
      question: "How does AI document processing work?",
      answer: "Once uploaded, documents are automatically processed using AI to extract key information, generate summaries, and categorize content. This process typically takes 1-2 minutes depending on document size."
    },
    {
      question: "What are compliance alerts?",
      answer: "Compliance alerts notify you when documents are approaching expiration dates or require renewal. These are color-coded: green (compliant), yellow (expiring soon), red (overdue)."
    },
    {
      question: "How do I manage user permissions?",
      answer: "Administrators can manage user roles and permissions from the User Management section. Available roles include Admin, Engineer, Accountant, and HR, each with specific access levels."
    }
  ];

  const quickLinks = [
    { title: "Getting Started Guide", icon: Book, description: "Step-by-step introduction to KMRL DocuManager" },
    { title: "Video Tutorials", icon: Video, description: "Watch comprehensive video guides" },
    { title: "User Manual", icon: FileText, description: "Complete documentation and features" },
    { title: "API Documentation", icon: ExternalLink, description: "Technical integration guides" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Help & Support
          </h1>
          <p className="text-muted-foreground">
            Find answers to your questions and get help using KMRL DocuManager.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-primary">
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="bg-gradient-card shadow-soft">
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for help topics, features, or questions..."
              className="pl-12 py-3 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Popular Questions */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-lg">{item.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  {index < faqItems.length - 1 && <hr className="border-border" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          {/* User Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{link.title}</h3>
                      <p className="text-muted-foreground">{link.description}</p>
                      <Button variant="ghost" className="p-0 h-auto text-primary">
                        Learn more →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Guides */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Feature Guides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Document Upload & Processing", icon: Upload, description: "Learn how to upload and process documents with AI" },
                { title: "Compliance Management", icon: Shield, description: "Monitor and manage compliance requirements" },
                { title: "User Administration", icon: Users, description: "Manage users, roles, and permissions" },
                { title: "Analytics & Reporting", icon: FileText, description: "Generate and analyze system reports" }
              ].map((guide, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <guide.icon className="w-6 h-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-soft">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="opacity-90 mb-4">Get immediate assistance from our support team</p>
                <p className="text-lg font-semibold">+91 484 2346-000</p>
                <p className="text-sm opacity-80">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-success border-0 text-success-foreground shadow-soft">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="opacity-90 mb-4">Send us detailed questions and feedback</p>
                <p className="text-lg font-semibold">support@kmrl.gov.in</p>
                <p className="text-sm opacity-80">Response within 24 hours</p>
              </CardContent>
            </Card>
          </div>

          {/* Support Ticket Form */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Submit Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Submit a support ticket and our team will get back to you promptly.
                </p>
                <Button className="bg-gradient-primary">
                  Create Support Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Additional Resources */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "System Status", description: "Check real-time system status and updates" },
                  { title: "Release Notes", description: "Latest features and improvements" },
                  { title: "Security Guidelines", description: "Best practices for document security" },
                  { title: "Training Materials", description: "Comprehensive training resources" },
                  { title: "Integration Guide", description: "Connect with external systems" },
                  { title: "Mobile App", description: "Access documents on mobile devices" }
                ].map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
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

export default Help;