"use client";

import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Try Drishty AI with your team",
    features: [
      "10 interviews/month",
      "Basic AI detection",
      "Standard reports",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₹4,999",
    period: "/month",
    description: "For growing recruiting teams",
    features: [
      "100 interviews/month",
      "Full detection suite",
      "Detailed trust reports",
      "Platform integrations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale hiring operations",
    features: [
      "Unlimited interviews",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise option",
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
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-[40px] font-normal text-foreground leading-tight">
            Transparent pricing.
            <br />
            No surprises.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Start free, scale as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 transition-shadow duration-300 ${
                plan.highlighted
                  ? "bg-foreground text-white shadow-xl"
                  : "bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              <h3
                className={`text-sm font-medium tracking-widest uppercase ${
                  plan.highlighted ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-semibold ${
                    plan.highlighted ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={
                      plan.highlighted ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-sm ${
                  plan.highlighted ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {plan.description}
              </p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
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
                className={`mt-8 block text-center px-6 py-3 rounded-full text-sm font-medium transition-colors ${
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
      </div>
    </section>
  );
}
