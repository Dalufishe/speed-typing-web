import React from "react";

export default function Header() {
  return (
    <div className="w-full h-full bg-d1">
      <style>
        {`
.support-ukraine, .support-ukraine:visited {
  background: rgb(0,0,0);
	display: flex;
	justify-content: center;
	padding-top: 5px;
	padding-bottom: 5px;
	z-index: 10000;
	text-decoration: none;
	font-family: arial;
}
.support-ukraine:hover, .support-ukraine:active {
	background: black;
	display: flex;
	background: rgb(80,80,80);
	text-decoration: none;
}
.support-ukraine__flag {
	height: 25px;
	margin-right: 10px;
}
.support-ukraine__flag__blue {
	width: 40px;
	height: 12.5px;
	background: #005BBB;
}
.support-ukraine__flag__yellow {
	width: 40px;
	height: 12.5px;
	background: #FFD500;
}
.support-ukraine__label {
	color: white;
	font-size: 12px;
	line-height: 25px;
}
`}
      </style>
      <a
        className="support-ukraine"
        href="https://help.unicef.org/ukraine-emergency"
        target="_blank"
        rel="nofollow noopener"
        title="Donate to support Ukraine's independence."
      >
        <div
          className="support-ukraine__flag"
          role="img"
          aria-label="Flag of Ukraine"
        >
          <div className="support-ukraine__flag__blue"></div>
          <div className="support-ukraine__flag__yellow"></div>
        </div>
        <div className="support-ukraine__label">
          Donate to support Ukraine's independence.
        </div>
      </a>
    </div>
  );
}
