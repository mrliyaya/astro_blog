import * as React from "react";
import Giscus from "@giscus/react";

const id = "inject-comments";

const Comments = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id} className="w-full">
      {mounted ? (
        <Giscus
          id={id}
          repo="mrliyaya/astro_blog"
          repoId="R_kgDOOCP61g"
          category="Announcements"
          categoryId="DIC_kwDOOCP61s4Cngc6"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="zh-CN"
          loading="lazy"
          theme="transparent_dark"
        />
      ) : null}
    </div>
  );
};
export default Comments;
