import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarryBackground from "@/components/StarryBackground";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <StarryBackground />
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              How we collect, use, and protect your information
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you use GC Keys, we may collect the following information:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Email address (provided during purchase)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Payment information (processed securely by third-party payment providers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Usage data and analytics (pages visited, interactions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Discord username (if you contact support)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Process and deliver your purchases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Provide customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Improve our products and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Prevent fraud and unauthorized transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take reasonable measures to protect your personal information from unauthorized access, 
                  alteration, or destruction. Payment processing is handled by secure third-party providers, 
                  and we do not store your full payment details on our servers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services for payment processing, analytics, and product delivery. 
                  These services have their own privacy policies, and we encourage you to review them. 
                  We are not responsible for the privacy practices of third-party services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may use cookies and similar technologies to enhance your browsing experience 
                  and collect usage analytics. You can disable cookies in your browser settings, but some 
                  features may not function properly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  information only when required by law or to protect our rights and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to update this Privacy Policy at any time. Changes will be posted 
                  on this page with an updated revision date.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us through our{" "}
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

export default PrivacyPolicy;
