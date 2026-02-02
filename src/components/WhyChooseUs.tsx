import { Shield, Zap, HeadphonesIcon, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "All our products are tested and verified for your safety and peace of mind."
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your keys delivered instantly after purchase, no waiting required."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help you with any issues."
  },
  {
    icon: Clock,
    title: "Regular Updates",
    description: "All products receive regular updates to ensure compatibility and performance."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose GC Keys?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best experience for our customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:bg-card/70 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
