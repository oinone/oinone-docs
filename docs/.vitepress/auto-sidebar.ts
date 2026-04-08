import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SidebarItem {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
  order?: number;
}

function parseFrontmatter(content: string) {
  let title = '';
  let order = 9999;
  let index = true;
  let dirLink = false;
  let hasIndex = false;
  let hasDirLink = false;
  
  // Extract only the frontmatter section enclosed by ---
  const fmMatch = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!fmMatch) {
    return { title, order, index, dirLink, hasIndex, hasDirLink };
  }
  
  const fmContent = fmMatch[1];
  
  const titleMatch = fmContent.match(/^title:\s*(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
  }

  const indexMatch = fmContent.match(/^index:\s*(true|false)/m);
  if (indexMatch) {
    hasIndex = true;
    index = indexMatch[1] === 'true';
  }

  const dirLinkMatch = fmContent.match(/^dir:[\s\S]*?^\s+link:\s*(true|false)/m);
  if (dirLinkMatch) {
    hasDirLink = true;
    dirLink = dirLinkMatch[1] === 'true';
  }

  // Check dir.order first
  const dirOrderMatch = fmContent.match(/^dir:[\s\S]*?^\s+order:\s*(\d+)/m);
  if (dirOrderMatch) {
    order = parseInt(dirOrderMatch[1], 10);
  } else {
    // Check root level order
    const orderMatch = fmContent.match(/^order:\s*(\d+)/m);
    if (orderMatch) {
      order = parseInt(orderMatch[1], 10);
    }
  }

  return { title, order, index, dirLink, hasIndex, hasDirLink };
}

export function getSidebar(relativePath: string, linkPrefix: string, depth: number = 1): SidebarItem[] {
  const dirPath = path.resolve(__dirname, '../', relativePath);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  const items: SidebarItem[] = [];

  for (const file of files) {
    if (file === 'README.md' || file === 'index.md' || file.startsWith('.')) {
      continue;
    }

    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const readmePath = path.join(fullPath, 'README.md');
      let title = file;
      let order = 9999;
      let index = true;
      let dirLink = false;
      
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf-8');
        const fm = parseFrontmatter(content);
        if (fm.title) title = fm.title;
        order = fm.order;
        index = fm.index;
        dirLink = fm.dirLink;
      }

      const children = getSidebar(path.join(relativePath, file), `${linkPrefix}${file}/`, depth + 1);
      
      if (!index && !dirLink && children.length === 0) {
        continue;
      }

      if (children.length > 0 || dirLink || index) {
        const item: SidebarItem = {
          text: title,
          collapsed: depth > 1,
          order
        };
        
        if (fs.existsSync(readmePath)) {
          const readmeContent = fs.readFileSync(readmePath, 'utf-8');
          const readmeFm = parseFrontmatter(readmeContent);
          
          const isIndexAllowed = readmeFm.hasIndex ? readmeFm.index : true;
          const isDirLinkExplicit = readmeFm.hasDirLink ? readmeFm.dirLink : null;
          
          let shouldLink = false;
          if (isDirLinkExplicit !== null) {
            shouldLink = isDirLinkExplicit; // dir.link overrides everything
          } else {
            // fallback to index logic
            if (readmeFm.hasIndex) {
              shouldLink = isIndexAllowed; 
            } else {
              // If neither dir.link nor index is explicitly set, fallback to whether the parent parsed it
              shouldLink = index; // Fallback to the current directory's index value, NOT just true
            }
          }
          
          if (shouldLink) {
            // For directories with README.md, the path in VitePress is to the README
            item.link = `${linkPrefix}${file}/README`;
          }
        } else if (dirLink || index) {
          // If there is no README but dirLink or index is true, allow linking
          item.link = `${linkPrefix}${file}/README`;
        }
        
        if (children.length > 0) {
          item.items = children;
        }
        
        items.push(item);
      }
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const fm = parseFrontmatter(content);
      
      if (!fm.index) {
        continue;
      }
      
      const title = fm.title || file.replace(/\.md$/, '');
      const order = fm.order;

      items.push({
        text: title,
        link: `${linkPrefix}${file.replace(/\.md$/, '')}`,
        order
      });
    }
  }

  // Sort items by order, then alphabetically by text
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 9999) - (b.order || 9999);
    }
    return a.text.localeCompare(b.text);
  }).map(item => {
    const { order, ...rest } = item;
    return rest;
  });
}
