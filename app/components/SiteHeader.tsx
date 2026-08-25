import { officialOverview } from "../data/official";
import { categories } from "../data/wiki";

type SiteHeaderProps = {
  currentPath?: string;
};

function DirectoryContent({ currentPath }: { currentPath: string }) {
  const handbookCategories = categories.filter((category) => category.slug !== "course-materials");
  const courseMaterials = categories.find((category) => category.slug === "course-materials");
  const isCurrent = (href: string) => href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <div className="site-directory-panel">
      <header><h2>目录</h2></header>

      <nav aria-label="全站目录">
        <section>
          <h3><span>01</span> 学院总览</h3>
          {officialOverview.map((item) => {
            const href = `/official/${item.slug}`;
            return <a className={isCurrent(href) ? "current" : ""} href={href} key={item.slug}>{item.title}</a>;
          })}
        </section>

        <section>
          <h3><span>02</span> 学生手册</h3>
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
  );
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="南赫 Wiki 首页">
          <span className="wordmark-box">NHI</span>
          <span><b>南赫 Wiki</b><small>学生共建</small></span>
        </a>
        <nav aria-label="主导航">
          <a href="/#official">学院总览</a>
          <a href="/#map">学生手册</a>
          <a href="/wiki/course-materials">课程资料</a>
          <a href="/wiki/contribute">共建指南</a>
          <a className="official-link" href="https://nh.nju.edu.cn" target="_blank" rel="noreferrer">学院官网 ↗</a>
        </nav>
      </header>

      <aside className="site-guide" aria-label="目录指引">
        <DirectoryContent currentPath={currentPath} />
      </aside>

      <details className="site-directory site-directory-mobile">
        <summary aria-label="目录总览">
          <span>目录</span>
          <b aria-hidden="true">＋</b>
        </summary>
        <DirectoryContent currentPath={currentPath} />
      </details>
    </>
  );
}
