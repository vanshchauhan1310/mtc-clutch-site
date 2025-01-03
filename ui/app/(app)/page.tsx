"use client"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import DotPattern from '@/components/ui/dot-pattern';
import GridPattern from '@/components/ui/grid-pattern';
import { WarpBackground } from '@/components/ui/warp-background';
import AboutUs from '@/content/about.mdx'
import { cn } from '@/lib/utils';
import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Home() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i>Welcome To,</i><br/><br/><span style="color: #F25022">Microsoft</span><br/><span style="color: #7FBA00">Technical</span><br/><span style="color: #00A4EF">Community.</span>'],
      typeSpeed: 100,
    });
  }, []);

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
                <span ref={el} />
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
          id="features"
          className="container space-y-6 text-center bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              About Us
            </h2>
            <MDXProvider>
              <AboutUs />
            </MDXProvider>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <WarpBackground>
              <div>Testing Warp</div>
            </WarpBackground>
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Past Events
            </h2>
            <Card>
              <CardHeader>
                Event Name
              </CardHeader>
              <CardContent>
                Event Details
              </CardContent>
              <CardFooter>
                Event Extra Details
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}