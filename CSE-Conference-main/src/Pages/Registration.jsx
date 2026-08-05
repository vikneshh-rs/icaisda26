import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Layers,
  Users,
  AlertCircle,
  Check,
  X,
  Phone,
  ShieldAlert,
  CreditCard,
  Award,
  Users2
} from "lucide-react";

const Registration = () => {
  const cards = [
    {
      title: "Join as a Presenter",
      subtitle: "Full Paper Publication",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      description: "For publishing your paper in the proceedings of the ICAISDA-2026, at least one author of the accepted paper must:",
      bullets: [
        "Complete the conference registration.",
        "Submit the final camera-ready paper.",
        "Provide the title and abstract of the presentation.",
        "Present the paper during the conference."
      ],
      bg: "bg-gradient-to-b from-blue-50/70 to-blue-100/30",
      border: "border-blue-200",
      textColor: "text-blue-900",
      btnText: "Register & Submit Paper",
      link: "/paperregistration",
      btnBg: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Join as a Presenter",
      subtitle: "Abstract Publication Only",
      icon: <Layers className="w-8 h-8 text-cyan-600" />,
      description: "If you are only interested in giving a presentation at the conference with publishing only Abstract of your paper in the proceedings. To register, you are required to submit:",
      bullets: [
        "Title of the presentation",
        "Abstract of the presentation"
      ],
      bg: "bg-gradient-to-b from-cyan-50/70 to-cyan-100/30",
      border: "border-cyan-200",
      textColor: "text-cyan-900",
      btnText: "Register Abstract",
      link: "/paperregistration",
      btnBg: "bg-cyan-600 hover:bg-cyan-700"
    },
    {
      title: "Join as a Listener",
      subtitle: "Certificate of Participation",
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      description: "ICAISDA-2026 is an unmissable conference. It is a good chance and an effective platform for you to meet many renowned experts and researchers in the field of the latest academic research. You welcome to attend this great event. You just need to complete the registration as a Listener before the registration deadline.",
      bullets: [
        "Co-authors, Scholars, and others: ₹2,000 / $40",
        "UG and PG students: ₹1,000 / $25",
        "Attend all technical and keynote sessions.",
        "Receive an official participation certificate."
      ],
      bg: "bg-gradient-to-b from-emerald-50/70 to-emerald-100/30",
      border: "border-emerald-200",
      textColor: "text-emerald-900",
      btnText: "Register as Listener",
      link: "/listenerregistration",
      btnBg: "bg-emerald-600 hover:bg-emerald-700"
    }
  ];

  const contacts = [
    { name: "Dr. K. Saruladha", phone: "+91 9442396080" },
    { name: "Dr. P. Salini", phone: "+91 9994738640" },
    { name: "Dr. M. Thenmozhi", phone: "+91 9500893708" },
    { name: "Dr. J.I. Sheeba", phone: "+91 9443084976" }
  ];

  const refundRules = [
    { time: "30 days ahead of the conference", refund: "50% of payment refund" },
    { time: "10-30 days ahead of the conference", refund: "30% of payment refund" },
    { time: "Within 10 days ahead of the conference", refund: "20% of payment refund" },
    { time: "After conference", refund: "No refund" }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-slate-800 pt-28 md:pt-36 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* HEADER SECTION */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-blue-900">
            REGISTRATION
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Register for ICAISDA-2026 to present your research, connect with leading scientists, or attend sessions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* SLIDER / MARQUEE BANNER */}
        <div className="w-full bg-emerald-50/80 border-y border-emerald-100 py-3 overflow-hidden rounded-xl shadow-inner relative">
          <div className="animate-marquee whitespace-nowrap text-sm md:text-base font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-16">
            <span>🎉 Registration is Now Open</span>
            <span>⚡ Submit Paper & Payment Proof Online</span>
            <span>🎉 Registration is Now Open</span>
            <span>⚡ Submit Paper & Payment Proof Online</span>
            <span>🎉 Registration is Now Open</span>
            <span>⚡ Submit Paper & Payment Proof Online</span>
            {/* Duplicate for seamless loop */}
            <span>🎉 Registration is Now Open</span>
            <span>⚡ Submit Paper & Payment Proof Online</span>
            <span>🎉 Registration is Now Open</span>
            <span>⚡ Submit Paper & Payment Proof Online</span>
            <span>🎉 Registration is Now Open</span>
            <span>⚡ Submit Paper & Payment Proof Online</span>
          </div>
          <style>
            {`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 20s linear infinite;
              }
            `}
          </style>
        </div>



        {/* 3 CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-white border ${card.border} ${card.bg} rounded-2xl p-8 flex flex-col justify-between shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{card.title}</span>
                  {card.icon}
                </div>
                <h3 className={`text-2xl font-bold ${card.textColor}`}>{card.subtitle}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.description}</p>

                <ul className="space-y-3 pt-2">
                  {card.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  to={card.link}
                  className={`block text-center py-4 rounded-2xl text-white font-extrabold text-base md:text-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${card.btnBg}`}
                >
                  {card.btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* IMPORTANT NOTES & CALL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Note Card */}
          <div className="lg:col-span-2 bg-amber-50/60 border border-amber-200 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold">Important Notes</h3>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed">
              <div className="flex gap-3">
                <Award className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <p>
                  A <strong>Presenter Certificate</strong> will be issued only to the author(s) who present the paper at the conference. The certificate will clearly indicate the Presenter(s), all authors of the paper, and the title of the paper.
                </p>
              </div>
              <div className="flex gap-3">
                <Users2 className="w-6 h-6 text-cyan-600 shrink-0 mt-1" />
                <p>
                  A maximum of <strong>three authors</strong> is permitted under a single paper registration. If a paper has more than three authors, all authors may be listed in the paper. However, authors beyond the first three must register separately under the <strong>Listener</strong> category if they wish to participate.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-blue-600">
                <Phone className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Registration Support</h3>
              </div>
              <p className="text-slate-500 text-sm mt-2">
                For further information or assistance regarding registration, please contact:
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 my-4">
              {contacts.map((contact, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <span className="font-semibold text-sm text-slate-700">{contact.name}</span>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-bold">
                    <Phone className="w-3.5 h-3.5" /> {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEES TABLE SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-lg space-y-6 overflow-hidden">
          <div className="flex items-center gap-3 text-blue-900">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold">Details of The Registration Fees</h3>
          </div>

          <div className="overflow-x-auto w-full rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-55 text-slate-700 text-xs md:text-sm font-semibold border-b border-slate-200">
                  <th className="p-4 md:p-5 w-1/2">Category</th>
                  <th className="p-4 md:p-5">India (INR)</th>
                  <th className="p-4 md:p-5">Others (USD)</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm divide-y divide-slate-200">
                {/* CATEGORY 1 */}
                <tr className="bg-blue-50/50">
                  <td colSpan="3" className="p-4 font-bold text-blue-950 border-b border-slate-200">
                    Join as a Presenter – Full Paper Publication in Springer Nature & Abstract Publication in ICAISDA-2026 Proceedings
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">Scholars and Students</td>
                  <td className="p-4 font-semibold text-slate-900">₹8,000</td>
                  <td className="p-4 font-semibold text-slate-900">$100</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">Academicians</td>
                  <td className="p-4 font-semibold text-slate-900">₹9,000</td>
                  <td className="p-4 font-semibold text-slate-900">$125</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">Industry and R&D</td>
                  <td className="p-4 font-semibold text-slate-900">₹10,000</td>
                  <td className="p-4 font-semibold text-slate-900">$150</td>
                </tr>

                {/* CATEGORY 2 */}
                <tr className="bg-cyan-50/40">
                  <td colSpan="3" className="p-4 font-bold text-cyan-950 border-b border-slate-200">
                    Join as a Presenter – Abstract Publication Only in the ICAISDA-2026 Proceedings
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">Academicians</td>
                  <td className="p-4 font-semibold text-slate-900">₹3,000</td>
                  <td className="p-4 font-semibold text-slate-900">$75</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">Scholars</td>
                  <td className="p-4 font-semibold text-slate-900">₹2,500</td>
                  <td className="p-4 font-semibold text-slate-900">$60</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">PG and UG Students</td>
                  <td className="p-4 font-semibold text-slate-900">₹2,000</td>
                  <td className="p-4 font-semibold text-slate-900">$50</td>
                </tr>

                {/* CATEGORY 3 */}
                <tr className="bg-emerald-50/40">
                  <td colSpan="3" className="p-4 font-bold text-emerald-950 border-b border-slate-200">
                    Join as a Listener - Certificate of Participation
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">Co-authors, Scholars, and others</td>
                  <td className="p-4 font-semibold text-slate-900">₹2,000</td>
                  <td className="p-4 font-semibold text-slate-900">$40</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 pl-8 text-slate-700">UG and PG students</td>
                  <td className="p-4 font-semibold text-slate-900">₹1,000</td>
                  <td className="p-4 font-semibold text-slate-900">$25</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs md:text-sm text-slate-500 space-y-2">
            <p className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0"></span>
              Registration fees include conference proceedings, lunches, refreshments and attending all technical sessions.
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0"></span>
              At least one author for each accepted final paper must pre-register.
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0"></span>
              Completed registrations will be acknowledged by the Organizing Committee within 2-5 workdays after receiving your payment.
            </p>
          </div>
        </div>

        {/* INCLUSIONS / EXCLUSIONS & REFUND POLICY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Exclusions Card */}
          <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-rose-800 flex items-center gap-2">
              <X className="w-6 h-6 text-rose-600" /> Registration Fee Exclusions
            </h3>
            <p className="text-slate-600 text-sm">
              Please note that the registration fee does <strong>not</strong> cover:
            </p>
            <ul className="space-y-3">
              {["Accommodation", "Visa application fee", "Transportation fare"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Refund Policy Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-amber-600" /> Refunds Policy
            </h3>
            <p className="text-slate-600 text-sm">
              If participants request cancellation and refund due to personal reasons:
            </p>
            <div className="space-y-3">
              {refundRules.map((rule, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 shadow-sm">
                  <span>{rule.time}</span>
                  <span className="font-semibold text-amber-700">{rule.refund}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic mt-2">
              * Cancellation and refund request must be made formally by email.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Registration;
