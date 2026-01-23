import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using our services
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using GC Keys services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Product Usage</h2>
                <p className="text-muted-foreground mb-4">
                  All products sold are for educational and testing purposes only. Users are responsible for:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Using products in accordance with applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Not using products for malicious or harmful activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Respecting the terms of service of third-party platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Understanding that products may require technical knowledge to use</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. Refund Policy</h2>
                
                <div className="bg-destructive/10 border border-destructive rounded-lg p-6 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                    <h3 className="text-xl font-bold text-destructive">ABSOLUTELY NO REFUNDS</h3>
                  </div>
                  <p className="text-destructive font-semibold text-lg">
                    ALL SALES ARE FINAL. NO EXCEPTIONS. NO REFUNDS UNDER ANY CIRCUMSTANCES.
                  </p>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Due to the digital nature of our products and services, we maintain a strict zero-refund policy. 
                  By purchasing any product or service from GC Keys, you acknowledge and agree that:
                </p>

                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>NO REFUNDS</strong> will be issued for any reason whatsoever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All purchases are <strong>FINAL</strong> and <strong>NON-REFUNDABLE</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>We do not provide refunds for technical issues, compatibility problems, or user error</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Chargebacks or payment disputes will result in permanent account suspension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>You are responsible for ensuring compatibility before purchase</span>
                  </li>
                </ul>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>WARNING:</strong> Please carefully review all product information, requirements, 
                    and descriptions before making a purchase. Once payment is processed, it cannot and will 
                    not be reversed under any circumstances.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Account Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Users are responsible for maintaining the security of their accounts and any activities 
                  that occur under their account. We recommend using strong passwords and not sharing account 
                  credentials with others.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  GC Keys shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
                  losses, resulting from your use of the service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us through our 
                  support channels. We aim to respond to all inquiries within 24 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: October 29, 2025
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
