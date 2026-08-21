import { officialOverview } from "../data/official";
import { categories } from "../data/wiki";

type SiteHeaderProps = {
  currentPath?: string;
};

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const handbookCategories = categories.filter((category) => category.slug !== "course-materials");
  const courseMaterials = categories.find((category) => category.slug === "course-materials");
  const isCurrent = (href: string) => href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="南赫气象站首页">
          <span className="wordmark-box">NHI</span>
          <span><b>南赫气象站</b><small>学生共建 Wiki</small></span>
        </a>
        <nav aria-label="主导航">
          <a href="/#official">学院概览</a>
          <a href="/#map">学生手册</a>
          <a href="/wiki/course-materials">课程资料</a>
          <a href="/wiki/contribute">共建指南</a>
          <a className="official-link" href="https://nh.nju.edu.cn" target="_blank" rel="noreferrer">学院官网 ↗</a>
        </nav>
      </header>

      <details className="site-directory">
        <summary>
          <span>目录总览</span>
          <b aria-hidden="true">＋</b>
        </summary>
        <div className="site-directory-panel">
          <header>
            <p className="mini-label">Site map</p>
            <h2>全站目录</h2>
            <p>不用一页页翻，直接从这里去你要看的地方。</p>
          </header>

          <nav aria-label="全站目录">
            <section>
              <h3><span>01</span> 学院概览</h3>
              {officialOverview.map((item) => {
                const href = `/official/${item.slug}`;
                return <a className={isCurrent(href) ? "current" : ""} href={href} key={item.slug}>{item.title}</a>;
              })}
            </section>

            <section>
              <h3><span>02</span> 学生手册与经验</h3>
              {handbookCategories.map((item) => {
                const href = `/wiki/${item.slug}`;
                return <a className={isCurrent(href) ? "current" : ""} href={href} key={item.slug}>{item.title}</a>;
              })}
            </section>

            {courseMaterials && (
              <section>
                <h3><span>03</span> 课程资料</h3>
                <a className={isCurrent("/wiki/course-materials") ? "current" : ""} href="/wiki/course-materials">课程资料总览</a>
                {courseMaterials.sections.map((section) => (
                  <a href={`/wiki/course-materials#${section.id}`} key={section.id}>{section.title}</a>
                ))}
              </section>
            )}
          </nav>

          <footer>
            <a href="/wiki/contribute">共建指南</a>
            <a href="https://nh.nju.edu.cn" target="_blank" rel="noreferrer">学院官网 ↗</a>
          </footer>
        </div>
      </details>
    </>
  );
}
