import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarryBackground from "@/components/StarryBackground";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <StarryBackground />
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Refund Policy</h1>
            <p className="text-lg text-muted-foreground">
              Please read our refund policy carefully before making a purchase
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="bg-destructive/10 border border-destructive rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                    <h2 className="text-2xl font-bold text-destructive">ABSOLUTELY NO REFUNDS</h2>
                  </div>
                  <p className="text-destructive font-semibold text-lg">
                    ALL SALES ARE FINAL. NO EXCEPTIONS. NO REFUNDS UNDER ANY CIRCUMSTANCES.
                  </p>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Due to the digital nature of our products and services, we maintain a strict zero-refund policy. 
                  By purchasing any product or service from GC Keys, you acknowledge and agree that:
                </p>

                <ul className="space-y-3 text-muted-foreground mb-6">
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
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this policy, please reach out through our{" "}
                  <a href="https://discord.com/invite/aCwcJukUf6" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Discord support server
                  </a>.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
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

export default RefundPolicy;
