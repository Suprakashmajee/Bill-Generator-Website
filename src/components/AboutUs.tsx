import { Shield, Users, Award, Sparkles } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about-us" className="py-16 md:py-24 bg-white border-t border-yellow-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-250">
            About Our Brand
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-4 tracking-tight">
            Who is Behind Bill_Store?
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-500 font-medium leading-relaxed">
            Bill_Store is a leading global invoice engineering utility suite built in 2026 to simplify the billing burden for creators, vendors, and businesses. We operate with structural compliance, helping creators focus on builders rather than tax audits.
          </p>
        </div>

        {/* Feature grid detailing who they are */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {[
            {
              icon: <Shield className="h-6 w-6 text-yellow-700" />,
              title: "Compliant & Legal",
              desc: "Engineered specifically to fulfill IRS US sales formatting, EU standard VAT parameters, and Indian GST rules CGST/SGST/IGST dynamically so your accounts stay flawlessly legal."
            },
            {
              icon: <Users className="h-6 w-6 text-yellow-700" />,
              title: "User-Centered Creators",
              desc: "Created for direct freelancers, startups, and SMB stores who require immediate client ledger invoices in under 60 seconds without complex databases or cloud servers."
            },
            {
              icon: <Award className="h-6 w-6 text-yellow-700" />,
              title: "Award-Winning PDF Vectors",
              desc: "Direct-to-client printable PDF blueprints generated locally in your web browser. Matches native high-res visual ratios perfectly for immaculate commercial receipt auditing."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-yellow-55/25 rounded-2xl border border-yellow-200/60 p-6 flex flex-col items-center text-center hover:bg-yellow-50/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 mb-4">
                {item.icon}
              </div>
              <h4 className="text-sm font-black text-gray-950 uppercase tracking-wider mb-2">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Highlight banner */}
        <div className="mt-16 bg-radial from-yellow-300 to-yellow-400 p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto shadow-md">
          <Sparkles className="h-8 w-8 text-gray-950 mx-auto animate-bounce mb-3" />
          <h3 className="text-lg md:text-xl font-black text-gray-950 tracking-tight">
            Fully Client-Side Local Execution Pipeline Included
          </h3>
          <p className="text-xs md:text-sm text-yellow-950 max-w-2xl mx-auto mt-2 font-medium leading-relaxed">
            Your billing details, logos, and totals never touch our servers! All operations execute completely locally inside your sandboxed browser tab, providing unmatched level of enterprise information confidentiality.
          </p>
        </div>

      </div>
    </section>
  );
}
