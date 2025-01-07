// File Utilies for handlink markdown files
// Logic and code written by Shubhang Sharma 2025

import fs from 'fs'
import path from 'path'
import matter from "gray-matter";


function mdFileExists(fileName: string, fileDirName: string): boolean {
   
const filePath = path.join(process.cwd(),fileDirName,fileName)
if (fs.existsSync(filePath)){
    return true
}
return false
}

function getMdFileContent(fileName: string, fileDirName: string): string | undefined {
    if (!mdFileExists(fileName,fileDirName))
    {
        throw new Error('This is not ReadMe File File Please Check File Extension !')
    }
    try {
    const filePath = path.join(process.cwd(),fileDirName,fileName); 
    const fileContent = fs.readFileSync(filePath,'utf-8')
    return fileContent
    } catch (error){
        console.log(error)
    }
    return
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

function getMdFilesInDir(fileDirName: string): string[] {
    const directoryPath = path.join(process.cwd(),fileDirName)
    if (!fs.existsSync(directoryPath)){
        throw new Error('This Directory Does Not Exist')
    }
    const dirData = fs.readdirSync(directoryPath,'utf-8')
    const mdFiles = dirData.filter((val) => (val.endsWith('.md')))
    return mdFiles
}

export function serializeMdFileContent(fileName: string,fileDirName: string): BlogPost{
    // If FileName is encoded URI We Will First decode it
    fileName = decodeURI(fileName)
    if (!fileName.endsWith('md')){
        // If IT Does not end with .md we will add it 
        fileName = `${fileName}.md` 
    }
    // Getting All the MD File Content
    const fileContent = getMdFileContent(fileName,fileDirName)
    if (!fileContent){
            throw new Error('This ReadMe File is Empty Failed to serialize')
        }
    // Getting All the MD Front Matter Content
    const frontMatter = getFrontMatter(fileContent);
    // Getting All the MD Data Content
    const mdContent = getMdContent(fileContent)

    //Removing Md From the FileName for the slug
    const slug = fileName.replace(/\.(md)$/, "");
    return { slug, frontMatter , mdContent };
}

export function getAllSerializedMdFilesInDir(fileDirName: string): BlogPost[] {
    const directoryPath = path.join(process.cwd(),fileDirName)
    if (!fs.existsSync(directoryPath)){
    throw new Error('This Readme Directory does not exist')
}
    const files = getMdFilesInDir(fileDirName)
    const blogPostData: BlogPost[] = files.map((file) => serializeMdFileContent(file,fileDirName))
    return blogPostData
}

export function getAllImagesNameInDir(fileDirName: string): string[]{
    const imageDirPath = path.join(process.cwd(),`public/${fileDirName}`)
    if (!fs.existsSync(imageDirPath)){
        throw new Error('This Gallery Directory does not exist')
    }
    const images: string[] = fs.readdirSync(imageDirPath,'utf-8').filter((items) => 
        items.endsWith('JPG') || 
        items.endsWith('jpeg') || 
        items.endsWith('png') || 
        items.endsWith('webm') || 
        items.endsWith('jpg')
    )
    return images
}
