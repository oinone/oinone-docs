
import fs from 'fs';
import path from 'path';

const docsRoot = path.resolve(process.cwd(), 'docs');
const targetDir = process.argv[2] || '';
const base = process.argv[3] || '/';
const excludeDirs = ['en', 'zh-cn', 'v6', '.vitepress'];

function getSidebarItems(dir, currentBase) {
    const fullPath = path.join(docsRoot, dir);
    if (!fs.existsSync(fullPath)) return [];
    
    let files = fs.readdirSync(fullPath);

    if (dir === '' || dir === 'zh-cn' || dir === 'en' || dir.startsWith('v6')) {
        files = files.filter(f => !excludeDirs.includes(f));
    }
    
    const items = [];
    for (const file of files) {
        if (file.startsWith('.')) continue;

        const filePath = path.join(fullPath, file);
        const stat = fs.statSync(filePath);
        const link = path.join(currentBase, file.replace('.md', ''));

        if (stat.isDirectory()) {
            items.push({
                text: file,
                collapsible: true,
                items: getSidebarItems(path.join(dir, file), link)
            });
        } else if (file.endsWith('.md') && !file.match(/^(index|readme)\.md$/i)) {
            items.push({
                text: path.basename(file, '.md'),
                link: link
            });
        }
    }
    return items;
}

const oldSidebarConfig = {
    en: [
        { text: "Description Of Product Characteristics", link: "Description-Of-Product-Characteristics.md" },
        { text: "Install Or Upgrade", link: "InstallOrUpgrade/" },
        { text: "UserManual", link: "UserManual/" },
        { text: "DevManual", link: "DevManual/" },
        { text: "Contribute", link: "Contribute/" },
        { text: "Third Party Open Source Software And License Notice", link: "Third-Party-Open-Source-Software-And-License-Notice.md" },
        { text: "Software Licenses", link: "software-licenses.md" },
    ],
    'zh-cn': [
        { text: "产品特性说明", link: "Description-Of-Product-Characteristics.md" },
        { text: "安装与升级", link: "InstallOrUpgrade/" },
        { text: "用户手册", link: "UserManual/" },
        { text: "研发手册", link: "DevManual/" },
        { text: "贡献手册", link: "Contribute/" },
        { text: "第三方开源软件及许可说明", link: "Third-Party-Open-Source-Software-And-License-Notice.md" },
        { text: "软件使用许可和合约", link: "software-licenses.md" },
    ]
};

const lang = targetDir.includes('en') ? 'en' : 'zh-cn';
const config = oldSidebarConfig[lang];
const sidebar = [];

for (const item of config) {
    const dirName = item.link.replace('/', '').replace('.md', '');
    const itemPath = path.join(targetDir, dirName);
    const fullItemPath = path.join(docsRoot, itemPath);

    if (item.link.endsWith('/')) {
        sidebar.push({
            text: item.text,
            collapsible: true,
            items: getSidebarItems(itemPath, path.join(base, dirName))
        });
    } else {
        sidebar.push({
            text: item.text,
            link: path.join(base, item.link.replace('.md', ''))
        });
    }
}

console.log(JSON.stringify(sidebar, null, 2));
