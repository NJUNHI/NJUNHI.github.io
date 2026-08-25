import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingNavigation } from "../../components/ReadingNavigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { allFacultyHref, facultyRosterHref, fullTimeFaculty } from "../../data/faculty";
import { administrationPeople, campusContacts, collaborationTimeline, officialNarratives } from "../../data/official-details";
import { officialOverview } from "../../data/official";

type PageProps = { params: Promise<{ slug: string }> };

function getOfficialEntry(slug: string) {
  return officialOverview.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getOfficialEntry(slug);
  return entry ? { title: entry.title, description: entry.text } : {};
}

export default async function OfficialEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getOfficialEntry(slug);
  if (!entry) notFound();
  const narrative = entry.slug === "introduction" || entry.slug === "advantages" ? officialNarratives[entry.slug] : null;
  const entryIndex = officialOverview.findIndex((candidate) => candidate.slug === entry.slug);
  const previousEntry = officialOverview[entryIndex - 1];
  const nextEntry = officialOverview[entryIndex + 1];

  return (
    <main>
      <SiteHeader currentPath={`/official/${entry.slug}`} />
      <article className="official-article">
        <nav className="breadcrumbs" aria-label="面包屑">
          <a href="/">首页</a><span>/</span>
          <a href="/#official">学院总览</a><span>/</span>
          <span>{entry.title}</span>
        </nav>

        <header className="official-article-hero">
          <div>
            <p className="eyebrow">OFFICIAL OVERVIEW · {entry.symbol}</p>
            <h1>{entry.title}</h1>
            <p>{entry.lead}</p>
          </div>
          <span aria-hidden="true">{entry.symbol}</span>
        </header>

        {entry.slug === "faculty" ? (
          <section className="faculty-directory" aria-labelledby="faculty-directory-title">
            <div className="faculty-directory-head">
              <div>
                <p className="mini-label">Full-time faculty</p>
                <h2 id="faculty-directory-title">南赫专任教师</h2>
                <p>名单核对于 2026 年 8 月 22 日。这里只列两篇代表论文，完整信息点老师主页。</p>
              </div>
              <div className="faculty-directory-links">
                <a href={facultyRosterHref} target="_blank" rel="noreferrer">官网专任教师名单 ↗</a>
                <a href={allFacultyHref} target="_blank" rel="noreferrer">全部南赫教师 ↗</a>
              </div>
            </div>

            <div className="faculty-grid">
              {fullTimeFaculty.map((member, index) => (
                <article className="faculty-card" key={member.name}>
                  <div className="faculty-card-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{member.name}</h3>
                      {member.englishName !== member.name && <p>{member.englishName}</p>}
                    </div>
                    <strong>{member.title}</strong>
                  </div>

                  <div className="faculty-card-section">
                    <h4>研究方向</h4>
                    <ul className="faculty-tags">
                      {member.directions.map((direction) => <li key={direction}>{direction}</li>)}
                    </ul>
                  </div>

                  <div className="faculty-card-section faculty-publications">
                    <h4>代表论文（节选）</h4>
                    <ol>
                      {member.publications.map((publication) => (
                        <li key={publication.title}>
                          {publication.href ? (
                            <a href={publication.href} target="_blank" rel="noreferrer">{publication.title}</a>
                          ) : <span>{publication.title}</span>}
                          <small>{publication.venue} · {publication.year}</small>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <a className="faculty-profile-link" href={member.profileHref} target="_blank" rel="noreferrer">
                    教师主页 <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="official-fact-grid" aria-label={`${entry.title}要点`}>
              {entry.facts.map((fact, index) => (
                <div key={fact.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{fact.title}</h2>
                  <p>{fact.text}</p>
                </div>
              ))}
            </section>

            {narrative && (
              <section className="official-reading" aria-labelledby="official-reading-title">
                <header className="official-reading-head">
                  <p className="mini-label">Read here</p>
                  <h2 id="official-reading-title">{narrative.heading}</h2>
                  {narrative.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </header>
                <div className="official-reading-grid">
                  {narrative.sections.map((section, index) => (
                    <section className="official-reading-card" key={section.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{section.title}</h3>
                      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      {section.points && (
                        <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
                      )}
                    </section>
                  ))}
                </div>
              </section>
            )}

            {entry.slug === "history" && (
              <section className="official-reading" aria-labelledby="official-history-title">
                <header className="official-reading-head">
                  <p className="mini-label">2009—2024</p>
                  <h2 id="official-history-title">合作时间线</h2>
                  <p>两校从联合科研、观测平台和实验室建设开始合作，之后逐步推进学院筹建和联合培养。</p>
                </header>
                <ol className="official-timeline">
                  {collaborationTimeline.map((item) => (
                    <li key={item.date}>
                      <time>{item.date}</time>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {entry.slug === "administration" && (
              <section className="official-reading" aria-labelledby="official-administration-title">
                <header className="official-reading-head">
                  <p className="mini-label">Administration</p>
                  <h2 id="official-administration-title">管理与学生事务</h2>
                  <p>按官网公开名单列出。具体事务找对应岗位，人员或联系方式变化时以官网为准。</p>
                </header>
                <div className="administration-grid">
                  {administrationPeople.map((person) => (
                    <article className="administration-card" key={person.name}>
                      <div>
                        <h3>{person.name}</h3>
                        <strong>{person.role}</strong>
                      </div>
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                      {person.phone && <span>{person.phone}</span>}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {entry.slug === "contact" && (
              <section className="official-reading" aria-labelledby="official-contact-title">
                <header className="official-reading-head">
                  <p className="mini-label">Contact</p>
                  <h2 id="official-contact-title">三个校区</h2>
                  <p>学院公共邮箱：<a href="mailto:nh@nju.edu.cn">nh@nju.edu.cn</a></p>
                </header>
                <div className="campus-contact-grid">
                  {campusContacts.map((contact, index) => (
                    <article className="campus-contact-card" key={contact.campus}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{contact.campus}</h3>
                      <dl>
                        <div><dt>地址</dt><dd>{contact.address}</dd></div>
                        <div><dt>邮编</dt><dd>{contact.postcode}</dd></div>
                        <div><dt>电话</dt><dd>{contact.phone}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <aside className="official-source-box">
          <div>
            <p className="mini-label">Official source</p>
            <h2>以学院官网最新信息为准</h2>
          </div>
          <a href={entry.officialHref} target="_blank" rel="noreferrer">{entry.slug === "faculty" ? "查看完整师资名单 ↗" : "查看学院官网原页面 ↗"}</a>
        </aside>

        <ReadingNavigation
          previous={previousEntry ? { href: `/official/${previousEntry.slug}`, title: previousEntry.title, context: "学院总览" } : undefined}
          overview={{ href: "/#official", title: "学院总览" }}
          next={nextEntry ? { href: `/official/${nextEntry.slug}`, title: nextEntry.title, context: "学院总览" } : undefined}
        />
      </article>
      <SiteFooter />
    </main>
  );
}
