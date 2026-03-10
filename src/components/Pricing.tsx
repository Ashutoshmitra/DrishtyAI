"use client";

import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Get started with basic detection",
    features: [
      "3 interviews/month",
      "Web-only detection",
      "Basic voice analysis",
      "Standard reports",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pay as you go",
    price: "₹149",
    period: "/interview",
    description: "No commitment, pay per use",
    features: [
      "No monthly limit",
      "Desktop agent",
      "Full detection suite",
      "Detailed trust reports",
      "PDF export",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Scale",
    price: "₹4,999",
    period: "/month",
    description: "For large hiring operations",
    highlighted: true,
    features: [
      "150 interviews/month",
      "API access",
      "Team members (up to 10)",
      "Custom signature rules",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For enterprise-scale operations",
    features: [
      "Unlimited interviews",
      "Unlimited team members",
      "On-premise option",
      "SSO / SAML",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section id="pricing" className="py-24 px-6">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-[40px] font-normal text-foreground leading-tight">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Start free. Pay only when you need more.
          </p>
        </div>

        {/* Free trial banner */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl border border-accent/20 px-8 py-5 text-center">
            <p className="text-foreground font-medium">
              Try all features free for 1 month
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Full access to desktop agent, all detection layers, and 30
              interviews. No credit card required.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-accent text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              Join the Waitlist
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 transition-shadow duration-300 flex flex-col ${
                plan.highlighted
                  ? "bg-foreground text-white shadow-xl md:scale-105"
                  : "bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              <h3
                className={`text-xs font-medium tracking-widest uppercase ${
                  plan.highlighted ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-0.5">
                <span
                  className={`text-3xl font-semibold ${
                    plan.highlighted ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-xs ${
                  plan.highlighted ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {plan.description}
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs"
                  >
                    <svg
                      className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? "text-accent-light" : "text-accent"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span
                      className={
                        plan.highlighted ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-6 block text-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-white text-foreground hover:bg-gray-100"
                    : "bg-foreground text-white hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          All prices in INR + applicable GST. Annual billing available at 20%
          discount.
        </p>
      </div>
    </section>
  );
}
