import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const contentDirectory = path.join(process.cwd(), 'content/cases');

export async function getAllCaseIds() {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        caseId: fileName.replace(/\.mdx$/, '')
      }
    };
  });
}

export async function getCaseData(caseId) {
  const fullPath = path.join(contentDirectory, `${caseId}.mdx`);
  if(!fs.existsSync(fullPath)){
    return {
      caseId,
      mdxSource: null,
      frontMatter: null
    };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the metadata and content
  const { data, content } = matter(fileContents);
  
  // Serialize the MDX content
  const mdxSource = await serialize(content);

  return {
    caseId,
    mdxSource,
    frontMatter: data
  };
}

export async function getAllCases() {
  const fileNames = fs.readdirSync(contentDirectory);
  const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));
  const allCasesData = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const caseId = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = await fs.promises.readFile(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        caseId,
        ...data
      };
    })
  );
  
  return allCasesData;
}