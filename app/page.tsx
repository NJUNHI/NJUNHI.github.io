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
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="weather-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>学生共建</span> · 非官方</p>
          <h1 id="hero-title">
            南赫学生 Wiki
            <em>从入学，到毕业。</em>
          </h1>
          <p className="hero-lead">
            查学院、找课程、看经验，也欢迎你来补充。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#official">学院概览</a>
            <a className="button button-ghost" href="#map">学生手册</a>
            <a className="button button-course" href="#course-materials">课程资料</a>
          </div>
        </div>

        <aside className="observation-card" aria-label="建站观测记录">
          <div className="observation-topline">
            <span>NHI / FIELD NOTE</span>
            <span>001</span>
          </div>
          <div className="sun-mark" aria-hidden="true"><span /></div>
          <dl>
            <div><dt>建站状态</dt><dd>综合 Wiki</dd></div>
            <div><dt>观测范围</dt><dd>学院 · 学业 · 生活</dd></div>
            <div><dt>更新方式</dt><dd>同学共同补充</dd></div>
          </dl>
          <p>今日提示：不确定的信息，请以学院当年通知为准。</p>
        </aside>
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
              <h2 id="official-title">先认识南赫</h2>
            </div>
          </div>
          <p>学院官网里常用的几页，先放在这里。</p>
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
              <div>{item.text}</div>
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
              <h2 id="map-title">学生手册与经验</h2>
            </div>
          </div>
          <p>生存手册是本站的底子。能用的先放上来，缺的以后再补。</p>
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
              <p>{category.summary}</p>
              <ul aria-label={`${category.title}包含内容`}>
                {category.quickLinks.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
              </ul>
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
            <p>{courseMaterials.summary}</p>
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

      <section className="start-here" aria-labelledby="start-title">
        <div className="start-note">
          <p className="mini-label">First things first</p>
          <h2 id="start-title">第一次来，先看这三件事</h2>
          <p>这里不是学院通知站。攻略是同学写的，遇到政策问题还是要看官网。</p>
        </div>
        <ol className="start-list">
          <li><span>01</span><div><strong>确认事实</strong><p>招生、培养方案和办事要求，优先查看学院官网及当年正式通知。</p></div></li>
          <li><span>02</span><div><strong>阅读经验</strong><p>攻略代表作者当时的经历，不一定适用于所有年级，欢迎补充时间标签。</p></div></li>
          <li><span>03</span><div><strong>留下记录</strong><p>哪怕只改一个错字、补一个链接，也能让后来的人少走一点弯路。</p></div></li>
        </ol>
      </section>

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
