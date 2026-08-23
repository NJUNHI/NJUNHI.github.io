import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingNavigation } from "../../components/ReadingNavigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { categories, getCategory } from "../../data/wiki";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? { title: category.title, description: category.summary } : {};
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const handbookCategories = categories.filter((item) => item.slug !== "course-materials");
  const readingCategories = category.slug === "course-materials"
    ? categories.filter((item) => item.slug === "course-materials")
    : handbookCategories;
  const completed = category.sections.flatMap((section) => section.items).filter((item) => item.status === "已整理").length;
  const total = category.sections.flatMap((section) => section.items).length;
  const categoryIndex = readingCategories.findIndex((item) => item.slug === category.slug);
  const previousCategory = readingCategories[categoryIndex - 1];
  const nextCategory = readingCategories[categoryIndex + 1];

  return (
    <main>
      <SiteHeader currentPath={`/wiki/${category.slug}`} />
      <div className="article-shell">
        <nav className="breadcrumbs" aria-label="面包屑">
          <a href="/">首页</a><span>/</span><span>{category.label}</span>
        </nav>

        <header className={`article-hero tone-${category.tone}`}>
          <div>
            <p className="eyebrow">NHI WIKI · {category.label}</p>
            <h1>{category.title}</h1>
          </div>
          <div className="article-symbol" aria-hidden="true">{category.symbol}</div>
        </header>

        <div className="article-layout">
          <aside className="article-index" aria-label="Wiki 分类">
            <p className="mini-label">学生手册与经验</p>
            <nav>
              {handbookCategories.map((item, index) => (
                <a className={item.slug === category.slug ? "active" : ""} href={`/wiki/${item.slug}`} key={item.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{item.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="article-copy">
            {category.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <div className="article-section-heading">
                  <span>{section.id.toUpperCase().replaceAll("-", " ")}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="entry-list">
                  {section.items.map((item, itemIndex) => {
                    const detailHref = `/wiki/${category.slug}/${section.id}/${itemIndex}`;
                    return (
                    <div className="entry" key={item.title}>
                      <div className="entry-title">
                        <h3><a className="entry-title-link" href={detailHref}>{item.title}</a></h3>
                        <a className={item.status === "已整理" ? "status-ready" : "status-todo"} href={detailHref}>
                          {item.status === "已整理" ? "阅读内容 ↗" : "待补充 ↗"}
                        </a>
                      </div>
                      {item.href && <a href={item.href} target="_blank" rel="noreferrer">查看相关入口 ↗</a>}
                    </div>
                    );
                  })}
                </div>
              </section>
            ))}

            <div className="article-contribute">
              <span aria-hidden="true">＋</span>
              <div>
                <h2>这一册还没有写完</h2>
                <p>看到“待补充”的地方，如果你知道，就来写两句。</p>
                <a href="/wiki/contribute">查看共建方式</a>
              </div>
            </div>

            <ReadingNavigation
              previous={previousCategory ? { href: `/wiki/${previousCategory.slug}`, title: previousCategory.title, context: "上一册" } : undefined}
              overview={{ href: "/#map", title: "Wiki 总览" }}
              next={nextCategory ? { href: `/wiki/${nextCategory.slug}`, title: nextCategory.title, context: "下一册" } : undefined}
            />
          </article>

          <aside className="article-meta">
            <div>
              <p className="mini-label">本页进度</p>
              <strong>{completed}<small> / {total}</small></strong>
              <div className="progress-track"><span style={{ width: `${Math.round((completed / total) * 100)}%` }} /></div>
              <p>条目已经有内容</p>
            </div>
            <div>
              <p className="mini-label">页内导航</p>
              {category.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
            </div>
            {category.source && (
              <div>
                <p className="mini-label">资料核对</p>
                <a href={category.source.href} target="_blank" rel="noreferrer">{category.source.label} ↗</a>
                <small>具体政策与安排以当年官方通知为准。</small>
              </div>
            )}
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
