import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const date = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const dir = join(process.cwd(), "dev-logs");
const file = join(dir, `${date}.md`);

await mkdir(dir, { recursive: true });

if (!existsSync(file)) {
  await writeFile(file, `# 开发日志 ${date}

## 今日完成

- [ ] 

## 进行中

- [ ] 

## 待办

- [ ] 

## 验证

- [ ] \`npm run check\`
- [ ] 本地页面打开正常

## 备注

- 
`, "utf8");
  console.log(`Created ${file}`);
} else {
  console.log(`Already exists: ${file}`);
}
