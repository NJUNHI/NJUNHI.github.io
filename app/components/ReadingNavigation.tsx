type ReadingLink = {
  href: string;
  title: string;
  context?: string;
};

type ReadingNavigationProps = {
  previous?: ReadingLink;
  next?: ReadingLink;
  overview: ReadingLink;
};

export function ReadingNavigation({ previous, next, overview }: ReadingNavigationProps) {
  return (
    <nav className="reading-navigation" aria-label="文章翻页">
      {previous ? (
        <a className="reading-navigation-link reading-navigation-previous" href={previous.href} rel="prev">
          <span>上一篇</span>
          <strong>← {previous.title}</strong>
          {previous.context && <small>{previous.context}</small>}
        </a>
      ) : (
        <span className="reading-navigation-link reading-navigation-disabled" aria-hidden="true">
          <span>上一篇</span>
          <strong>已经是第一篇</strong>
        </span>
      )}

      <a className="reading-navigation-overview" href={overview.href}>
        <span>返回目录</span>
        <strong>{overview.title}</strong>
      </a>

      {next ? (
        <a className="reading-navigation-link reading-navigation-next" href={next.href} rel="next">
          <span>下一篇</span>
          <strong>{next.title} →</strong>
          {next.context && <small>{next.context}</small>}
        </a>
      ) : (
        <span className="reading-navigation-link reading-navigation-next reading-navigation-disabled" aria-hidden="true">
          <span>下一篇</span>
          <strong>已经是最后一篇</strong>
        </span>
      )}
    </nav>
  );
}
