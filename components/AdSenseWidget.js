import React from "react";

export default class AdSenseWidget extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3093798853216759"
        data-ad-slot="6870568097"
        data-ad-format="auto"
        data-full-width-responsive={true}
      ></ins>
    );
  }
}
