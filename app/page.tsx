import { SearchPanel } from "./components/SearchPanel";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { officialOverview, officialSearchEntries, officialServices } from "./data/official";
import { categories, searchEntries } from "./data/wiki";

export default function Home() {
  const handbookCategories = categories.filter((category) => category.slug !== "course-materials");
  const courseMaterials = categories.find((category) => category.slug === "course-materials");

  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>学生共建</span> · 非官方</p>
          <h1 id="hero-title">
            南赫 Wiki
            <em>从入学，到毕业。</em>
          </h1>
          <div className="hero-actions">
            <a className="button button-primary" href="#official">学院总览</a>
            <a className="button button-ghost" href="#map">学生手册</a>
            <a className="button button-course" href="#course-materials">课程资料</a>
            <a className="button button-contact" href="https://github.com/NJUNHI/.github/blob/main/profile/README.md" target="_blank" rel="noreferrer">联系我们</a>
          </div>
        </div>
      </section>

      <section className="search-strip" aria-label="搜索 Wiki">
        <div>
          <span className="section-number">00</span>
          <div>
            <p className="mini-label">快速定位</p>
            <h2>你现在想找什么？</h2>
          </div>
        </div>
        <SearchPanel entries={[...officialSearchEntries, ...searchEntries]} />
      </section>

      <section className="official-hub" id="official" aria-labelledby="official-title">
        <header className="section-heading major-section-heading official-section-heading">
          <div className="major-section-title">
            <span className="major-section-number" aria-hidden="true">01</span>
            <div>
              <p className="mini-label">Official Information</p>
              <h2 id="official-title">学院总览</h2>
            </div>
          </div>
        </header>

        <div className="official-services" aria-label="常用官方入口">
          {officialServices.map((service) => (
            <a href={service.href} target="_blank" rel="noreferrer" key={service.label}>
              <span>官方入口</span>
              <div><strong>{service.label}</strong><small>{service.description}</small></div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>

        <div className="official-grid">
          {officialOverview.map((item) => (
            <a href={`/official/${item.slug}`} className="official-card" key={item.title}>
              <div className="official-card-topline"><span>{item.symbol}</span><span>官方信息</span></div>
              <p>{item.label}</p>
              <h3>{item.title}</h3>
              <span>看看 <b>→</b></span>
            </a>
          ))}
        </div>
      </section>

      <section className="wiki-map" id="map" aria-labelledby="map-title">
        <header className="section-heading major-section-heading student-section-heading">
          <div className="major-section-title">
            <span className="major-section-number" aria-hidden="true">02</span>
            <div>
              <p className="mini-label">Student Handbook</p>
              <h2 id="map-title">学生手册</h2>
            </div>
          </div>
        </header>

        <div className="category-grid">
          {handbookCategories.map((category, index) => (
            <a
              href={`/wiki/${category.slug}`}
              className={`category-card tone-${category.tone}`}
              key={category.slug}
            >
              <div className="card-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{category.label}</span>
              </div>
              <div className="card-symbol" aria-hidden="true">{category.symbol}</div>
              <h3>{category.title}</h3>
              <span className="card-link">打开这一册 <b>↗</b></span>
            </a>
          ))}
        </div>
      </section>

      {courseMaterials && (
        <section className="course-materials-home" id="course-materials" aria-labelledby="course-materials-title">
          <div>
            <div className="major-section-title">
              <span className="major-section-number" aria-hidden="true">03</span>
              <div>
                <p className="mini-label">Course Materials</p>
                <h2 id="course-materials-title">课程资料</h2>
              </div>
              </div>
          </div>
          <a href="/wiki/course-materials">
            <div className="course-materials-mark" aria-hidden="true">{courseMaterials.symbol}</div>
            <ul aria-label="课程资料包含内容">
              {courseMaterials.quickLinks.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <span>进入课程资料 <b>↗</b></span>
          </a>
        </section>
      )}

      <section className="source-note" aria-label="身份说明">
        <span className="source-stamp">UNOFFICIAL</span>
        <div>
          <h2>关于这个站</h2>
          <p>
            这是同学维护的非官方网站。通知、政策和培养要求，请以
            <a href="https://nh.nju.edu.cn" target="_blank" rel="noreferrer">学院官方网站</a>为准。
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
