import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import DotPattern from '@/components/ui/dot-pattern';
import { MagicCard } from '@/components/ui/magic-card';
import matter from 'gray-matter'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import fs from 'fs'
import path from 'path';
import TypedText from '@/components/typed-text';
import AboutUs from '@/content/about.mdx'
import Link from 'next/link';
// import { WarpBackground } from '@/components/ui/warp-background';

interface BlogPost {
  slug: string;
  content: string;
  [key: string]: any;
}

function getEventsBlogs(): BlogPost[] | undefined {
  const eventsBlogsDirectoryPath = path.join(process.cwd(), 'events');
  const fileNames = fs.readdirSync(eventsBlogsDirectoryPath)
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const filePath = path.join(eventsBlogsDirectoryPath, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const { content, data } = matter(fileContents)
    return {
      slug,
      content,
      ...data,
    }
  })
}


export default function Home() {
  const blogs = getEventsBlogs()

  return (
    <>
      <div className=''>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
          )}
        />
        <section className="relative flex min-h-[70vh] items-center justify-center">
          <div className="container relative z-10 flex max-w-[64rem] flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="font-bold text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                {/* <span ref={el} /> */}
                <TypedText />
              </h1>
            </div>
            <div className="flex-1">
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

          className="container space-y-6 text-center bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              About Us
            </h2>
            <div className='text-white text-center'>
              <AboutUs />
            </div>
          </div>
        </section>
        {/* <WarpBackground>
          <div>Warp Test</div>
        </WarpBackground> */}
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
                <CardContent className="text-left">
                  <p>{e.content.substring(0, 100)}...</p>
                </CardContent>
                <CardFooter className="text-right">
                  <Link href={`/events/${e.slug}`} className="text-blue-500 hover:underline">
                    Read more
                  </Link>
                </CardFooter>
              </MagicCard>
            ))}
          </div>
        </section>
        <section
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Our Sponsers</h2>
            <div>
              We have sponsers !
            </div>
          </div>
        </section>
      </div>
    </>
  )
}