import React from "react";
import amazonLogo from "../assets/amazon.png";
import gmailLogo from "../assets/gmail.png";
import hatClubLogo from "../assets/hat_club.png";
import spotifyLogo from "../assets/spotify.png";
import discordLogo from "../assets/discord.jpg";
import excelLogo from "../assets/excel.jpg";
import slackLogo from "../assets/slack.png";
import bambuLogo from "../assets/bambu.png";
import passwordGenerator from "../assets/password_generator.png";
import foxStag from "../assets/fox_stag.png";
import AnimatedClock from "../components/clock";
import "../index.css";

export default function Home() {
  const apps = [
    { name: "Discord", route: "discord://", image: discordLogo },
    {
      name: "Excel",
      route:
        "https://m365.cloud.microsoft/launch/excel/?version=18.2311.1071.0&auth=1&origindomain=microsoft365",
      image: excelLogo,
    },
    { name: "Slack", route: "slack://open", image: slackLogo },
    { name: "Bambu Lab", route: "bambustudio://", image: bambuLogo },
    { name: "Spotify", route: "spotify://", image: spotifyLogo },
    { name: "Amazon", route: "https://www.amazon.com", image: amazonLogo },
    {
      name: "The Hat Club",
      route:
        "https://www.hatclub.com/collections/a-frame?&sort.ss_days_since_published=asc&page=1",
      image: hatClubLogo,
    },
    {
      name: "gmail",
      route: "https://mail.google.com/mail/u/2/#inbox",
      image: gmailLogo,
    },
  ];

  const passwordGeneratorFullRoute = "/xeneon-edge-personal-display/password-generator";

  const imageStyle = {
    height: "140px",
    width: "140px",
    objectFit: "fill",
    borderRadius: "35px",
  };

  const imageStyleTwo = {
    height: "500px",
    objectFit: "contain",
    zIndex: "10",
    position: "fixed",
    right: "0px",
    bottom: "0px",
  };

  const containerStyle = {
    width: "50vw",
    height: "100vh",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    paddingRight: "75px",
    justifyContent: "start",
    alignItems: "center",
    zIndex: "5",
  };

  function openLocalApp(appRoute) {
    window.open(appRoute);
  }

  return (
    <div className="parentStyle">
      <AnimatedClock />
      <div style={containerStyle}>
        {apps.map((app, index) => (
          <button key={index} onClick={() => openLocalApp(app.route)}>
            {app.image ? (
              <img src={app.image} alt={app.name} style={imageStyle} />
            ) : null}
            {!app.image ? app.name : null}
          </button>
        ))}
        <a
          href={passwordGeneratorFullRoute}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button>
            <img
              src={passwordGenerator}
              alt="Password Generator"
              style={imageStyle}
            />
          </button>
        </a>
      </div>
      <img src={foxStag} alt="Fox Stag" style={imageStyleTwo} />
    </div>
  );
}
