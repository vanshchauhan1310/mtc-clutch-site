import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'


// Custom MDX Components Rendering

const CustomMDXComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-4xl text-center font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-3xl font-semibold mb-3">{children}</h2>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-base leading-relaxed mb-4">{children}</p>
    ),
    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
        <a
            href={href}
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="text-base leading-relaxed">{children}</li>
    ),
};

//  Checking if the slugname exists or not well we could have done it in getFileData and returned string or boolean
//  But I like to make it organized
function fileExists(fileName: string): boolean {
    const filePath = path.join(process.cwd(), 'events', `${fileName}.mdx`);
    return fs.existsSync(filePath)
}

// Reading MDX FileData and returning It
function getFileData(fileName: string): string {
    const filePath = path.join(process.cwd(), 'events', `${fileName}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent
}

export default async function Events({ params }: { params: { slugs: string } }) {
    //TODO we can implement UseEffect here to implement in future
    const { slugs } = params;
    if (fileExists(slugs)) {
        const mdx_data = getFileData(slugs);
        return (
            <div className="prose max-w-none items-center">
                {/* Rendering the MDX Files :) */}
                <MDXRemote source={mdx_data} components={CustomMDXComponents} />
            </div>
        )
    }
    else {
        return (<div>No Event Found of this name</div>)
    }
}
