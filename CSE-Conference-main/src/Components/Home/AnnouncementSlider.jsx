import React from "react";
import { FileText, ExternalLink, Sparkles, BookOpen, BellRing, AlertCircle } from "lucide-react";

const AnnouncementSlider = () => {
  const announcements = [
    {
      badge: "FEE & DEADLINE",
      title: "Registration @ Rs.8000 till 20.10.2026",
      desc: "With additional late processing fee Rs.1000 till 25.10.2026 (Hard Deadline)",
      link: "#/registration",
      linkText: "Register Now",
      icon: <Sparkles className="w-4 h-4 text-yellow-300 shrink-0 animate-pulse" />,
      highlight: true,
    },
    {
      badge: "NOTIFICATION",
      title: "Paper Notification in Progress",
      desc: "Paper acceptance notifications and intimations are currently in progress.",
      link: "#/registration",
      linkText: "Registration Details",
      icon: <BellRing className="w-4 h-4 text-cyan-400 shrink-0" />,
      highlight: false,
    },
    {
      badge: "NEW",
      title: "Word Template Published",
      desc: "Download the official Microsoft Word formatting template for ICAISDA-2026 submissions.",
      link: "https://drive.google.com/drive/folders/1F-UdCoJtnJ60xmlznowQ8h9-ft3H23PV?usp=sharing",
      linkText: "Download Word Template",
      icon: <FileText className="w-4 h-4 text-blue-400 shrink-0" />,
      highlight: false,
    },
    {
      badge: "OFFICIAL",
      title: "Proceedings Author Guidelines Published",
      desc: "Check the comprehensive proceedings author instructions & formatting slides.",
      link: "https://drive.google.com/file/d/11jGtYTXokSTyP0UPXTRaVJ3o_fvYBbN7/view?usp=sharing",
      linkText: "View Author Guidelines",
      icon: <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />,
      highlight: false,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-y border-blue-500/30 py-2.5 overflow-hidden relative z-20 shadow-md">
      <div className="flex items-center">
        {/* Left Static Announcement Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-blue-600/90 text-white text-xs font-black px-4 py-1.5 rounded-r-full shadow-md z-30 uppercase tracking-wider shrink-0 mr-4 border-r border-y border-blue-400/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Announcements</span>
        </div>

        {/* Sliding Ticker */}
        <div className="overflow-hidden relative w-full group">
          <div className="animate-announcement flex items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {/* Render 3 times for seamless continuous loop */}
            {[...announcements, ...announcements, ...announcements].map((item, idx) => (
              <div
                key={idx}
                className={`inline-flex items-center gap-2.5 text-xs md:text-sm ${
                  item.highlight ? "text-amber-100 font-semibold" : "text-slate-200"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider ${
                    item.highlight
                      ? "bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/50"
                      : "bg-white/10 border border-white/20 text-yellow-300"
                  }`}
                >
                  {item.badge}
                </span>
                {item.icon}
                <span className={`font-bold ${item.highlight ? "text-yellow-200" : "text-white"}`}>
                  {item.title}
                </span>
                {item.desc && (
                  <span className={`${item.highlight ? "text-amber-200 font-medium" : "text-slate-300"}`}>
                    — {item.desc}
                  </span>
                )}
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-bold underline transition hover:scale-105 ml-1 ${
                    item.highlight
                      ? "text-yellow-300 hover:text-white"
                      : "text-cyan-300 hover:text-white"
                  }`}
                >
                  <span>{item.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600 mx-3">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes announcementSlide {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
          .animate-announcement {
            display: inline-flex;
            width: max-content;
            animation: announcementSlide 28s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementSlider;
