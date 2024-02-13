import React from "react";
import { Helmet } from "react-helmet";

export const KoFiPage = () => {
  return (
    <>
      <Helmet>
        <title>Noodle Scheduling ~ Buy the creator a coffee</title>
      </Helmet>
      <h2>Buy me a coffee?</h2>

      <p>
        Not gonna lie, Noodle is essentially free to run (for now). A few bucks
        a month, however, would support the development of new features and keep
        it free to use forever.
      </p>

      <p>
        If you'd like to "buy me a coffee" (or a bowl of noodles), you can do so
        on Ko-Fi.
      </p>
      <p>
        <a href="https://ko-fi.com/S6S3OWUA1" target="_blank" rel="noreferrer">
          <img
            height="36"
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </p>
    </>
  );
};
