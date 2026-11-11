import React from "react";
import { FileText, ExternalLink, Sparkles, BookOpen, BellRing, AlertCircle, Presentation, Calendar } from "lucide-react";

const AnnouncementSlider = () => {
  const announcements = [
    {
      badge: "CLOSED",
      title: "Registrations are Officially CLOSED",
      desc: "Registration deadline has passed. Thank you for the overwhelming response!",
      link: "#/registration",
      linkText: "View Notice",
      icon: <AlertCircle className="w-4 h-4 text-yellow-300 shrink-0" />,
      highlight: true,
      blink: true,
    },
    {
      badge: "SCHEDULE",
      title: "Offline Schedule & Timings Published",
      desc: "Download the complete conference offline program schedule, presentation tracks, and inauguration timings.",
      link: "https://drive.google.com/file/d/1HnFpmMTMuvB2eQAdNBaneIINMdS1udrM/view?usp=sharing",
      linkText: "Download Offline Schedule",
      icon: <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />,
      highlight: true,
      blink: false,
    },
    {
      badge: "NEW",
      title: "Presentation PPT Template Published",
      desc: "Download the official PowerPoint presentation template for your ICAISDA-2026 paper presentation.",
      link: "https://docs.google.com/presentation/d/17FJGuhD1Z6tgfwY8k1_wkR4hMqZH1wUE/edit?usp=sharing&ouid=114098769929117624762&rtpof=true&sd=true",
      linkText: "Download PPT Template",
      icon: <Presentation className="w-4 h-4 text-amber-400 shrink-0" />,
      highlight: true,
      blink: false,
    },
    {
      badge: "NOTIFICATION",
      title: "Paper Notification in Progress",
      desc: "Paper acceptance notifications and intimations are currently in progress.",
      link: "#/registration",
      linkText: "Registration Details",
      icon: <BellRing className="w-4 h-4 text-cyan-400 shrink-0" />,
      highlight: false,
      blink: false,
    },
    {
      badge: "NEW",
      title: "Word Template Published",
      desc: "Download the official Microsoft Word formatting template for ICAISDA-2026 submissions.",
      link: "https://drive.google.com/drive/folders/1F-UdCoJtnJ60xmlznowQ8h9-ft3H23PV?usp=sharing",
      linkText: "Download Word Template",
      icon: <FileText className="w-4 h-4 text-blue-400 shrink-0" />,
      highlight: false,
      blink: false,
    },
    {
      badge: "OFFICIAL",
      title: "Proceedings Author Guidelines Published",
      desc: "Check the comprehensive proceedings author instructions & formatting slides.",
      link: "https://drive.google.com/file/d/11jGtYTXokSTyP0UPXTRaVJ3o_fvYBbN7/view?usp=sharing",
      linkText: "View Author Guidelines",
      icon: <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />,
      highlight: false,
      blink: false,
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
                  item.blink
                    ? "animate-message-blink bg-rose-950/40 border border-rose-500/50 px-3 py-1 rounded-xl shadow-inner"
                    : item.highlight
                    ? "text-amber-100 font-semibold"
                    : "text-slate-200"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider ${
                    item.blink
                      ? "bg-rose-600 text-white border border-rose-400 animate-badge-blink shadow-md shadow-rose-600/50"
                      : item.highlight
                      ? "bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/50"
                      : "bg-white/10 border border-white/20 text-yellow-300"
                  }`}
                >
                  {item.blink && <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping shrink-0"></span>}
                  {item.badge}
                </span>
                {item.icon}
                <span className={`font-bold ${item.blink ? "text-yellow-300 font-black tracking-wide" : item.highlight ? "text-yellow-200" : "text-white"}`}>
                  {item.title}
                </span>
                {item.desc && (
                  <span className={`${item.blink ? "text-rose-100 font-bold" : item.highlight ? "text-amber-200 font-medium" : "text-slate-300"}`}>
                    — {item.desc}
                  </span>
                )}
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-bold transition hover:scale-105 ml-1 ${
                    item.blink
                      ? "text-yellow-300 hover:text-white bg-rose-600/60 hover:bg-rose-600 px-2.5 py-0.5 rounded-lg no-underline shadow-sm"
                      : item.highlight
                      ? "text-yellow-300 hover:text-white underline"
                      : "text-cyan-300 hover:text-white underline"
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
          @keyframes badgeBlink {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
              box-shadow: 0 0 12px rgba(244, 63, 94, 0.8);
            }
            50% {
              opacity: 0.45;
              transform: scale(0.96);
              box-shadow: 0 0 2px rgba(244, 63, 94, 0.2);
            }
          }
          @keyframes messageBlink {
            0%, 100% {
              opacity: 1;
              filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
            }
            50% {
              opacity: 0.65;
              filter: drop-shadow(0 0 1px rgba(251, 191, 36, 0.1));
            }
          }
          .animate-announcement {
            display: inline-flex;
            width: max-content;
            animation: announcementSlide 28s linear infinite;
          }
          .animate-badge-blink {
            animation: badgeBlink 1s ease-in-out infinite;
          }
          .animate-message-blink {
            animation: messageBlink 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementSlider;
