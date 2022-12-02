import "./AlbumPreview.scss";
function AlbumPreview(props) {
  return (
    <section className="album-preview-component">
      <article>
        <section className="album-preview-top">
          <article className="preview-addr">🥕 제목이랍니다</article>
        </section>
        <section className="album-preview-bottom">
          <article className="album-preview-main">
            <section className="preivew-main-top">
              <article className="preview-photos"></article>
            </section>
            <section className="preview-main-bottom">
              <article className="preview-writing">
                <section className="preview-writing-top">
                  <article className="writing-title">제목</article>
                  <article className="writing-date">0000-00-00</article>
                </section>
                <hr />
                <section className="preview-writing-bottom">
                  <article className="writing-content">
                    내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                  </article>
                </section>
              </article>
            </section>
          </article>
        </section>
      </article>
    </section>
  );
}
export default AlbumPreview;
