import type { Block } from '@/content/types';

/** One renderer for every prose surface: topics, notes, essays, scripts, chapters. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h':
            return <h3 key={i}>{block.text}</h3>;
          case 'p':
            return <p key={i}>{block.text}</p>;
          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case 'note':
            return <aside className="prose-note" key={i}>{block.text}</aside>;
          case 'figure':
            return (
              <figure className="topic-figure" key={i}>
                <table>
                  <caption>{block.caption}</caption>
                  <tbody>
                    {block.rows.map(([k, v], j) => (
                      <tr key={j}><th scope="row">{k}</th><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            );
        }
      })}
    </div>
  );
}
