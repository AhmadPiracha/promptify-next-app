import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-mid:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptify is a platform for discovering and sharing AI-generated
        prompts.
      </p>

      {/* Feed */}

      <Feed />
    </section>
  );
};

export default Home;
