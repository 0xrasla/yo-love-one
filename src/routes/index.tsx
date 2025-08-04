import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import {
  Calendar,
  Heart,
  BellRingIcon as Ring,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const loveQuotes = [
  "Every love story is beautiful, but ours is my favorite. 💕",
  "You are my today and all of my tomorrows. 🌹",
  "In all the world, there is no heart for me like yours. 💖",
  "I have found the one whom my soul loves. ✨",
  "You make my heart skip a beat every single day. 💓",
  "Together is a wonderful place to be. 🥰",
  "You are my sunshine on a cloudy day. ☀️",
  "Love is not just looking at each other, it's looking in the same direction. 👫",
  "I choose you. And I'll choose you over and over. 💍",
  "You are my person, my love, my life. 💝",
  "Every day with you is a new adventure. 🎈",
  "You complete me in every way possible. 🧩",
  "My heart is perfect because you are in it. 💗",
  "You are the reason I believe in love. 🌟",
  "Forever isn't long enough when I'm with you. ⏰",
];

const FloatingParticle = ({
  type,
  delay = 0,
}: {
  type: "heart" | "star" | "sparkle";
  delay?: number;
}) => {
  const icons = {
    heart: <Heart className="w-3 h-3 fill-current" />,
    star: <Star className="w-2 h-2 fill-current" />,
    sparkle: <Sparkles className="w-2 h-2 fill-current" />,
  };

  const colors = {
    heart: "text-pink-400",
    star: "text-yellow-400",
    sparkle: "text-purple-400",
  };

  return (
    <div
      className={`fixed animate-float-complex opacity-30 ${colors[type]} pointer-events-none z-0`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${4 + Math.random() * 3}s`,
      }}
    >
      {icons[type]}
    </div>
  );
};

const CountdownCard = ({
  value,
  label,
  gradient,
}: {
  value: number;
  label: string;
  gradient: string;
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
    }
  }, [value, displayValue]);

  return (
    <div
      className={`${gradient} rounded-xl p-4 sm:p-6 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25`}
    >
      <div
        className={`text-2xl sm:text-4xl font-bold transition-all duration-300 ${isAnimating ? "scale-110 blur-sm" : "scale-100"}`}
      >
        {displayValue.toString().padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm opacity-90 font-medium">{label}</div>
    </div>
  );
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [targetDate] = useState(new Date(2026, 5, 26));
  const [dailyQuote, setDailyQuote] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const bride = "Rasla";
  const groom = "Sorna";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dayOfYear = Math.floor(
      (currentDate.getTime() -
        new Date(currentDate.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    setDailyQuote(loveQuotes[dayOfYear % loveQuotes.length]);

    const difference = targetDate.getTime() - currentDate.getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  }, [currentDate, targetDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === currentDate.getDate() &&
      currentDate.getMonth() === currentDate.getMonth() &&
      currentDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const isTargetDay = (day: number | null) => {
    if (!day) return false;
    return (
      day === targetDate.getDate() &&
      currentDate.getMonth() === targetDate.getMonth() &&
      currentDate.getFullYear() === targetDate.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <FloatingParticle key={`heart-${i}`} type="heart" delay={i * 0.3} />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <FloatingParticle key={`star-${i}`} type="star" delay={i * 0.5} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <FloatingParticle
            key={`sparkle-${i}`}
            type="sparkle"
            delay={i * 0.7}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 fill-current animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
              {bride} & {groom}
            </h1>
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 fill-current animate-pulse" />
          </div>
          <p className="text-base sm:text-lg text-gray-300 font-medium">
            Our Love Story Continues...
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Ring className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-bounce" />
            <span className="text-xs sm:text-sm text-gray-400">
              Counting down to forever
            </span>
            <Ring className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-bounce" />
          </div>
        </div>

        <Card className="mb-6 sm:mb-8 bg-gray-900/80 backdrop-blur-xl border-gray-700 shadow-2xl shadow-pink-500/10">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                <span className="hidden sm:inline">
                  Days Until Our Special Day
                </span>
                <span className="sm:hidden">Until Our Special Day</span>
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <CountdownCard
                  value={timeLeft.days}
                  label="Days"
                  gradient="bg-gradient-to-br from-pink-500 to-rose-600"
                />
                <CountdownCard
                  value={timeLeft.hours}
                  label="Hours"
                  gradient="bg-gradient-to-br from-purple-500 to-pink-600"
                />
                <CountdownCard
                  value={timeLeft.minutes}
                  label="Minutes"
                  gradient="bg-gradient-to-br from-rose-500 to-purple-600"
                />
                <CountdownCard
                  value={timeLeft.seconds}
                  label="Seconds"
                  gradient="bg-gradient-to-br from-pink-600 to-rose-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Calendar */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700 shadow-2xl shadow-purple-500/10">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-white">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs sm:text-sm font-medium text-gray-400 p-1 sm:p-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square flex items-center justify-center text-xs sm:text-sm rounded-lg transition-all duration-300 relative
                      ${day ? "hover:bg-gray-700 cursor-pointer" : ""}
                      ${isToday(day) ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white font-bold shadow-lg shadow-pink-500/50 animate-pulse" : ""}
                      ${isTargetDay(day) ? "bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/50 ring-2 ring-yellow-400 animate-bounce" : ""}
                      ${day && !isToday(day) && !isTargetDay(day) ? "text-gray-300 hover:text-white" : ""}
                    `}
                  >
                    {day}
                    {isTargetDay(day) && (
                      <Heart className="w-2 h-2 sm:w-3 sm:h-3 absolute -bottom-1 text-yellow-300 fill-current animate-ping" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Quote */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700 shadow-2xl shadow-rose-500/10">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 text-white flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 fill-current animate-pulse" />
                <span className="hidden sm:inline">Today's Love Quote</span>
                <span className="sm:hidden">Love Quote</span>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 fill-current animate-pulse" />
              </h3>
              <div className="text-center">
                <blockquote className="text-sm sm:text-lg text-gray-200 italic mb-4 leading-relaxed">
                  "{dailyQuote}"
                </blockquote>
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-spin" />
                  <span>With all our love</span>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-spin" />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg border border-gray-600">
                  <div className="text-xl sm:text-2xl font-bold text-pink-400">
                    {Math.floor(
                      (currentDate.getTime() -
                        new Date("2021-08-21").getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </div>
                  <div className="text-xs text-gray-400">Days Together</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg border border-gray-600">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400 animate-pulse">
                    ∞
                  </div>
                  <div className="text-xs text-gray-400">Love Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 fill-current animate-pulse" />
            <span className="text-xs sm:text-sm">
              Made with endless love for {bride} & {groom}
            </span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 fill-current animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
