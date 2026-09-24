import React from "react";
import { FileText, ExternalLink, Sparkles, BookOpen } from "lucide-react";

const AnnouncementSlider = () => {
  const announcements = [
    {
      badge: "NEW",
      title: "Word Template Published",
      desc: "Download the official Microsoft Word formatting template for ICAISDA-2026 submissions.",
      link: "https://drive.google.com/drive/folders/1F-UdCoJtnJ60xmlznowQ8h9-ft3H23PV?usp=sharing",
      linkText: "Download Word Template",
      icon: <FileText className="w-4 h-4 text-blue-400 shrink-0" />,
    },
    {
      badge: "OFFICIAL",
      title: "Proceedings Author Guidelines Published",
      desc: "Check the comprehensive proceedings author instructions & formatting slides.",
      link: "https://drive.google.com/file/d/11jGtYTXokSTyP0UPXTRaVJ3o_fvYBbN7/view?usp=sharing",
      linkText: "View Author Guidelines",
      icon: <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />,
    },
    {
      badge: "DEADLINE",
      title: "Submission & Registration Deadlines",
      desc: "Paper submission: 28-09-2026 | Registration deadline: 10-10-2026.",
      link: "#/papersubmission",
      linkText: "Submit / Register",
      icon: <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />,
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
            {/* Render twice for seamless continuous loop */}
            {[...announcements, ...announcements, ...announcements].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 text-xs md:text-sm text-slate-200"
              >
                <span className="inline-flex items-center gap-1 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold text-yellow-300">
                  {item.badge}
                </span>
                {item.icon}
                <span className="font-bold text-white">{item.title}:</span>
                <span className="text-slate-300 hidden md:inline">{item.desc}</span>
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-300 hover:text-white underline font-semibold transition hover:scale-105"
                >
                  <span>{item.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600 mx-2">•</span>
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
