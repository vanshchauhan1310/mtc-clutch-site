import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import DotPattern from '@/components/ui/dot-pattern';
import { MagicCard } from '@/components/ui/magic-card';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import fs from 'fs'
import path from 'path';
import TypedText from '@/components/typed-text';
import Link from 'next/link';
import { siteConfig, SiteConfig } from '@/config/site';
import SparklesText from '@/components/ui/sparkles-text';
import { BorderBeam } from '@/components/ui/border-beam';
import { MtcAnimateBeam } from '@/components/mtc-animatedbeam';

interface BlogPost {
  slug: string;
  [key: string]: any;
}

function getEventsBlogs(): BlogPost[] | undefined {
  const eventsBlogsDirectoryPath = path.join(process.cwd(), 'events');
  const fileNames = fs.readdirSync(eventsBlogsDirectoryPath)
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const filePath = path.join(eventsBlogsDirectoryPath, fileName)
    return {
      slug,
    }
  })
}


export default function Home() {
  const blogs = getEventsBlogs()

  return (
    <>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
        )}
      />
      <section className="relative flex min-h-[70vh] items-center justify-center">
        <div className="container relative z-10 flex max-w-[64rem] flex-row items-center justify-between gap-8">
          <div className="flex-1 w-[450px]">
            <h1 className="font-bold text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              <TypedText />
            </h1>
          </div>
          <div className="w-[500px] flex-shrink-0 hidden md:block ml-auto">
            <Image
              src="/team_image.jpeg"
              alt='MTC Team Image'
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      <section
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto gap-8 flex max-w-[58rem] flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
          <div className="flex-1 text-left space-y-4">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              About Us
            </h2>
            <div className="text-white">
              {siteConfig.about}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <MtcAnimateBeam />
          </div>
        </div>
      </section>

      <section

        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Past Events
          </h2>
          {blogs?.map((e, index) => (
            <MagicCard key={index} className="w-full max-w-md mx-auto">
              <CardHeader className="text-xl font-bold">{e.slug}</CardHeader>
              <CardFooter className="text-right">
                <Link href={`/events/${e.slug}`} className="text-blue-500 hover:underline">
                  Read more
                </Link>
              </CardFooter>
            </MagicCard>
          ))}
        </div>
      </section>
      <section className="container bg-slate-50 py-16 dark:bg-transparent lg:py-20">
        <div className="mx-auto flex max-w-[72rem] flex-col items-center space-y-8">
          <SparklesText
            className="font-heading text-4xl font-extrabold tracking-tight lg:text-5xl"
            text='Our Sponsors'
          />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
            {siteConfig.sponsers.map((sponsor, index) => (
              <MagicCard
                key={index}
                className="w-full transform transition-transform hover:scale-105"
              >
                <div className="p-8 text-center flex flex-col items-center gap-6">
                  {sponsor.logo && (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <Image
                        src={`/${sponsor.logo}`}
                        alt={`${sponsor.name} logo`}
                        width={200}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {sponsor.description}
                  </p>
                </div>
                <BorderBeam size={250} duration={12} delay={9} className='rounded-lg' />
              </MagicCard>

            ))}
          </div>
        </div>
      </section>
    </>
  )
}