// File Utilies for handlink markdown files
// Logic and code written by Shubhang Sharma 2025

import fs from 'fs'
import path from 'path'
import matter from "gray-matter";


async function mdFileExists(fileName: string, fileDirName: string): Promise<boolean> {
    const filePath = path.join(process.cwd(), fileDirName, fileName);
    try {
        await fs.promises.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function getMdFileContent(fileName: string, fileDirName: string): Promise<string> {
    if (!mdFileExists(fileName, fileDirName)) {
        throw new Error('This is not a valid Markdown file. Please check file extension!');
    }
    
    const filePath = path.join(process.cwd(), fileDirName, fileName);
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

function getFrontMatter(fileContent: string): FrontMatterInterface {
    const file = matter(fileContent, { excerpt: true });
    const title: string = file.data["title"] || "";
    const description: string = file.data["description"] || "";
    const date: string = file.data["date"] || "";
    const thumbnail: string = file.data["thumbnail"] || "";
    const frontMatter: FrontMatterInterface = {
      title: title,
      description: description,
      date: date,
      thumbnail: thumbnail,
    };
    return frontMatter;
  }

function getMdContent(fileContent: string): string {
    const file = matter(fileContent, {excerpt: true});
    const mdContent = file.content;
    return mdContent
}

async function getMdFilesInDir(fileDirName: string): Promise<string[]> {
    const directoryPath = path.join(process.cwd(),fileDirName)
    if (await !fs.promises.access(directoryPath)){
        throw new Error('This Directory Does Not Exist')
    }
    const dirData = await fs.promises.readdir(directoryPath,'utf-8')
    const mdFiles = dirData.filter((val) => (val.endsWith('.md')))
    return mdFiles
}

export async function serializeMdFileContent(fileName: string,fileDirName: string): Promise<BlogPost>{
    // If FileName is encoded URI We Will First decode it
    fileName = decodeURI(fileName)
    if (!fileName.endsWith('md')){
        // If IT Does not end with .md we will add it 
        fileName = `${fileName}.md` 
    }
    // Getting All the MD File Content
    const fileContent = await getMdFileContent(fileName,fileDirName)
    if (!fileContent){
            throw new Error('This ReadMe File is Empty Failed to serialize')
        }
    // Getting All the MD Front Matter Content
    const frontMatter =  getFrontMatter(fileContent);
    // Getting All the MD Data Content
    const mdContent = getMdContent(fileContent)

    //Removing Md From the FileName for the slug
    const slug = fileName.replace(/\.(md)$/, "");
    return { slug, frontMatter , mdContent };
}

export async function getAllSerializedMdFilesInDir(fileDirName: string): Promise<BlogPost[]> {
    const directoryPath = path.join(process.cwd(), fileDirName);
    try {
        await fs.promises.access(directoryPath);
    } catch {
        throw new Error('This Readme Directory does not exist');
    }

    const files = await getMdFilesInDir(fileDirName);
    const blogPostData = await Promise.all(
        files.map((file) => serializeMdFileContent(file, fileDirName))
    );
    return blogPostData;
}

export async function getAllImagesNameInDir(fileDirName: string): Promise<string[]>{
    const imageDirPath = path.join(process.cwd(),`public/${fileDirName}`)
    if (await !fs.promises.access(imageDirPath)){
        throw new Error('This Gallery Directory does not exist')
    }
    const images: string[] =  (await fs.promises.readdir(imageDirPath,'utf-8')).filter((items) => 
        items.endsWith('JPG') || 
        items.endsWith('jpeg') || 
        items.endsWith('png') || 
        items.endsWith('webm') || 
        items.endsWith('jpg')
    )
    return images
}
