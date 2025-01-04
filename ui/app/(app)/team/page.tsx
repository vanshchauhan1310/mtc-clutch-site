import HyperText from "@/components/ui/hyper-text"
import { MagicCard } from "@/components/ui/magic-card"
import Meteors from "@/components/ui/meteors"
import Particles from "@/components/ui/particles"
import SparklesText from "@/components/ui/sparkles-text"
import { teamConfig } from "@/config/site"
import Image from "next/image"
import Link from "next/link"

export default function Team() {
    const teamData = teamConfig.teams
    return (
        <>
            <section className="container mx-auto min-h-screen w-full relative px-4 py-16 items-center">
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={100}
                    ease={80}
                    color={'#ffffff'}
                    refresh
                />

                <SparklesText className="font-bold text-5xl text-center mb-16" text="Meet the Team" />
                <div className="space-y-20">
                    {teamData.map((team) => (
                        <div key={team.type} className="space-y-12">
                            <HyperText className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-200">
                                {team.type}
                            </HyperText>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center">
                                {team.users.map((user, index) => (
                                    <MagicCard
                                        key={`${user.name}_${index}`}
                                        className="relative flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[300px]"
                                    >
                                        <div className="flex flex-col items-center space-y-6">
                                            <Image
                                                src={`/team/${user.image}`}
                                                alt={user.name}
                                                width={200}
                                                height={200}
                                                className="rounded-full object-cover w-40 h-40 border-4  border-black dark:border-black"
                                            />
                                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                                {user.name}
                                            </h3>
                                            <Link
                                                href={`${user.linkedin}`}
                                                target="_blank"
                                                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </MagicCard>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </>)
}