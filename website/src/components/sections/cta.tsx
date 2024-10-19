import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
const reviews = [
  {
    name: "Alex",
    username: "@alex",
    body: "JOLO has made self-reflection so much easier. I love being able to just speak my mind!",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Morgan",
    username: "@morgan",
    body: "The AI insights are spot on! I never thought journaling could be this engaging.",
    img: "https://avatar.vercel.sh/morgan",
  },
  {
    name: "Jordan",
    username: "@jordan",
    body: "JOLO’s voice-first approach fits perfectly into my busy lifestyle. Highly recommend!",
    img: "https://avatar.vercel.sh/jordan",
  },
  {
    name: "Taylor",
    username: "@taylor",
    body: "The gamified streaks and badges keep me coming back every day. Its so motivating!",
    img: "https://avatar.vercel.sh/taylor",
  },
  {
    name: "Riley",
    username: "@riley",
    body: "I didn’t realize how much I needed this until I tried it. JOLO is a game-changer!",
    img: "https://avatar.vercel.sh/riley",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "Finally, a journaling app that understands me. JOLO has become a part of my daily routine.",
    img: "https://avatar.vercel.sh/charlie",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function CTA() {
  return (
    <section id="cta">
      <div className="py-14 container mx-auto px-4 max-w-[1000px] ">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
          <div className="absolute rotate-[35deg]">
            <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s]"
              repeat={3}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s]"
              repeat={3}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s]"
              repeat={3}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>
          <div className="z-10 mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
            <Icons.logo className="w-auto h-full" />
          </div>
          <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
            <h1 className="text-3xl font-bold lg:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="mt-2">{siteConfig.description}</p>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-8 text-white rounded-full group mt-4"
              )}
            >
              {siteConfig.cta}
              <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
        </div>
      </div>
    </section>
  );
}
