import { MagicCard } from "@/components/ui/magic-card";
import Image from "next/image";
import TypedText from "@/components/typed-text";
import { siteConfig } from "@/config/site";
import SparklesText from "@/components/ui/sparkles-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MtcAnimateBeam } from "@/components/mtc-animatedbeam";
import EventsCarousel from "@/components/events-card";
import { getAllSerializedMdFilesInDir } from "@/lib/fileUtils";

//TODO Fix Mobile View Errors

export default function Home() {
  const events_dir: string = "events"; //TODO Add it to config
  const blogs = getAllSerializedMdFilesInDir(events_dir);

  return (
    <>
      {/* Intro Section */}
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <section className="relative flex min-h-[70vh] items-center justify-center">
          <div className="container relative z-10 flex max-w-[64rem] flex-col items-center justify-center gap-8 px-4 sm:flex-row sm:justify-between">
            <div className="flex-1 w-full sm:w-[500px] text-center sm:text-left">
              <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl min-h-[200px] sm:min-h-[144px] md:min-h-[156px] lg:min-h-[180px]">
                <TypedText />
              </h1>
            </div>
            <div className="w-full sm:w-[490px] flex-shrink-0">
              <Image
                src="/team_image.jpeg"
                alt="MTC Team Image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center px-4 py-12 sm:py-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <section className="container relative z-20 w-full max-w-7xl mx-auto">
          <div className="mx-auto gap-8 flex max-w-[58rem] flex-col space-y-4">
            <MagicCard className="p-4 sm:p-6 opacity-90 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex-1 text-left space-y-4">
                  <h2 className="font-bold text-3xl sm:text-4xl md:text-6xl text-center sm:text-left">
                    About Us
                  </h2>
                  <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {siteConfig.about}
                  </div>
                </div>
                <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                  <MtcAnimateBeam />
                </div>
              </div>
            </MagicCard>
          </div>
        </section>
      </div>

      {/* Events Section */}
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center px-4 py-12 sm:py-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <section className="container relative z-20 w-full max-w-7xl mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-8 text-center">
            <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-6xl">
              Past Events
            </h2>
            {blogs && <EventsCarousel blogs={blogs} />}
          </div>
        </section>
      </div>

      {/* Sponsors Section */}
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center px-4 py-12 sm:py-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <section className="container relative z-20 w-full max-w-7xl mx-auto py-8 sm:py-16">
          <div className="mx-auto flex max-w-[72rem] flex-col items-center space-y-12">
            <SparklesText
              className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl text-center"
              text="Our Sponsors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {siteConfig.sponsers.map((sponsor, index) => (
                <MagicCard
                  key={index}
                  className="w-full opacity-95 transform transition-transform hover:scale-105 shadow-[0_4px_10px_#262626,0_-4px_10px_#FE8BBB] h-full"
                >
                  <div className="p-4 sm:p-6 text-center flex flex-col items-center gap-4">
                    {sponsor.logo && (
                      <div className="relative w-full h-20 sm:h-24 flex items-center justify-center">
                        <Image
                          src={`/sponsers/${sponsor.logo}`}
                          alt={`${sponsor.name} logo`}
                          width={160}
                          height={80}
                          className="object-contain opacity-100"
                        />
                      </div>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {sponsor.description}
                    </p>
                  </div>
                  <BorderBeam
                    size={250}
                    duration={12}
                    delay={9}
                    className="rounded-lg"
                  />
                </MagicCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
