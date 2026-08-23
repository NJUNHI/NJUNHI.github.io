import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingNavigation } from "../../../../components/ReadingNavigation";
import { SiteFooter } from "../../../../components/SiteFooter";
import { SiteHeader } from "../../../../components/SiteHeader";
import handbookContentJson from "../../../../data/handbook-content.json";
import handbookSourceMapJson from "../../../../data/handbook-source-map.json";
import { categories, getCategory } from "../../../../data/wiki";

type PageProps = { params: Promise<{ slug: string; section: string; item: string }> };
type SourceContent = Record<string, { html: string; source: string }>;

const handbookContent = handbookContentJson as SourceContent;
const handbookSourceMap = handbookSourceMapJson as Record<string, string[]>;

function getDetail(slug: string, sectionId: string, itemParam: string) {
  const category = getCategory(slug);
  const section = category?.sections.find((candidate) => candidate.id === sectionId);
  const itemIndex = Number.parseInt(itemParam, 10);
  const item = Number.isInteger(itemIndex) ? section?.items[itemIndex] : undefined;
  if (!category || !section || !item || String(itemIndex) !== itemParam) return null;
  return { category, section, item, itemIndex };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, section, item } = await params;
  const detail = getDetail(slug, section, item);
  return detail ? { title: detail.item.title, description: detail.item.text } : {};
}

export default async function HandbookDetailPage({ params }: PageProps) {
  const { slug, section: sectionId, item: itemParam } = await params;
  const detail = getDetail(slug, sectionId, itemParam);
  if (!detail) notFound();

  const { category, section, item, itemIndex } = detail;
  const sourceKey = `${category.slug}/${section.id}/${itemIndex}`;
  const sourceHeadings = handbookSourceMap[sourceKey] ?? [];
  const sourceParts = sourceHeadings
    .map((heading) => ({ heading, content: handbookContent[heading] }))
    .filter((part): part is { heading: string; content: { html: string; source: string } } => Boolean(part.content));
  const isTodo = item.status !== "已整理";
  const readingCategories = category.slug === "course-materials"
    ? categories.filter((readingCategory) => readingCategory.slug === "course-materials")
    : categories.filter((readingCategory) => readingCategory.slug !== "course-materials");
  const readingSequence = readingCategories.flatMap((readingCategory) =>
    readingCategory.sections.flatMap((readingSection) =>
      readingSection.items.map((readingItem, readingItemIndex) => ({
        href: `/wiki/${readingCategory.slug}/${readingSection.id}/${readingItemIndex}`,
        title: readingItem.title,
        context: `${readingCategory.title} · ${readingSection.title}`,
        sourceKey: `${readingCategory.slug}/${readingSection.id}/${readingItemIndex}`,
      })),
    ),
  );
  const readingIndex = readingSequence.findIndex((candidate) => candidate.sourceKey === sourceKey);
  const previousEntry = readingSequence[readingIndex - 1];
  const nextEntry = readingSequence[readingIndex + 1];

  return (
    <main>
      <SiteHeader currentPath={`/wiki/${category.slug}/${section.id}/${itemIndex}`} />
      <div className="handbook-detail-shell">
        <nav className="breadcrumbs" aria-label="面包屑">
          <a href="/">首页</a><span>/</span>
          <a href={`/wiki/${category.slug}`}>{category.title}</a><span>/</span>
          <span>{item.title}</span>
        </nav>

        <div className="handbook-detail-layout">
          <aside className="detail-aside" aria-label="本组条目">
            <p className="mini-label">{section.title}</p>
            <nav>
              {section.items.map((candidate, index) => (
                <a
                  className={index === itemIndex ? "active" : ""}
                  href={`/wiki/${category.slug}/${section.id}/${index}`}
                  key={candidate.title}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>{candidate.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="handbook-detail">
            <header className={`handbook-detail-header tone-${category.tone}`}>
              <p className="eyebrow">{category.label} · {section.title}</p>
              <h1>{item.title}</h1>
              <p>{item.text}</p>
              <span className={isTodo ? "status-todo" : "status-ready"}>{isTodo ? "待补充" : "已整理"}</span>
            </header>

            <div className="official-resource-bar" aria-label="常用官方入口">
              <span>官方入口</span>
              <a href="https://nh.nju.edu.cn/" target="_blank" rel="noreferrer">学院官方网站 ↗</a>
              <a href="https://ehall.nju.edu.cn/ywtb-portal/official/index.html" target="_blank" rel="noreferrer">南京大学网上办事服务大厅 ↗</a>
            </div>

            {isTodo ? (
              <section className="todo-page" aria-label="待补充内容">
                <span aria-hidden="true">…</span>
                <h2>待补充～</h2>
                <p>To be done</p>
                <small>这部分还没人写，知道的话欢迎补上。</small>
              </section>
            ) : sourceParts.length > 0 ? (
              <div className="handbook-source">
                {sourceParts.map(({ heading, content }) => (
                  <section className="handbook-source-part" key={heading}>
                    {sourceParts.length > 1 && <h2>{heading}</h2>}
                    <div className="handbook-content" dangerouslySetInnerHTML={{ __html: content.html }} />
                  </section>
                ))}
              </div>
            ) : (
              <section className="handbook-fallback">
                <h2>正文</h2>
                <p>{item.text}</p>
              </section>
            )}

            <footer className="detail-footer">
              {item.href && <a href={item.href} target="_blank" rel="noreferrer">相关入口 ↗</a>}
              {!isTodo && item.handbookPage && <a href={`/handbook-2026.pdf#page=${item.handbookPage}`} target="_blank" rel="noreferrer">查看 PDF 原页 ↗</a>}
            </footer>

            <ReadingNavigation
              previous={previousEntry}
              overview={{ href: `/wiki/${category.slug}#${section.id}`, title: `${category.title}目录` }}
              next={nextEntry}
            />
          </article>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
