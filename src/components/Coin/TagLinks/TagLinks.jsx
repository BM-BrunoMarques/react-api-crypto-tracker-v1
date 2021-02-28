import "../../../App.css";
import "./TagLinks.css";
import React from "react";
import { Tag } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  RedditOutlined,
  SendOutlined,
  CodeSandboxOutlined,
  GithubOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { colors } from "../../../utils/const";

export default function TagLinks(props) {
  const { coinData } = props;
  const { facebook, reddit, twitter, telegram, repos, blueGray } = colors;

  const renderLinksLabel = (item, color, icon) => {
    if (!item) return;
    let url, itemName;
    if (item.length) {
      url = new URL(item);
      const itemSplit = url.hostname.split(".");

      itemName = itemSplit[Math.floor((itemSplit.length - 1) / 2)];
    }
    return (
      item?.length && (
        <a key={(url, itemName)} rel="noopener noreferrer" target="_blank" href={item}>
          <Tag icon={icon} color={color}>
            {itemName}
          </Tag>
        </a>
      )
    );
  };

  //the API is returning objects with empty arrays declared. must check first position [0] to deal with objects with empy properties
  const checkForContent = (section) => {
    switch (section) {
      case "social":
        return (
          coinData.links.subreddit_url?.length ||
          coinData.links.twitter_screen_name?.length ||
          coinData.links.facebook_username?.length ||
          coinData.links.telegram_channel_identifier?.length ||
          coinData.links.official_forum_url[0]
        );

      case "repos":
        return (
          coinData.links.repos_url.github[0] ||
          coinData.links.repos_url.bitbucket[0]
        );

      default:
    }
  };

  const renderSocialLinks = ({ icon, color, link, label }) =>
    link && (
      <a key={label} rel="noopener noreferrer" target="_blank" href={link}>
        <Tag icon={icon} color={color}>
          {label}
        </Tag>
      </a>
    );

  const socialLinksStructure = [
    {
      icon: <RedditOutlined />,
      color: reddit,
      link: coinData.links.subreddit_url,
      label: "Reddit",
    },
    {
      icon: <TwitterOutlined />,
      color: twitter,
      link: coinData.links.twitter_screen_name,
      label: "Twitter",
    },
    {
      icon: <FacebookOutlined />,
      color: facebook,
      link: coinData.links.facebook_username,
      label: "Facebook",
    },
    {
      icon: <SendOutlined />,
      color: telegram,
      link: coinData.links.telegram_channel_identifier,
      label: "Telegram",
    },
  ];

  const codeReposLinks = [
    {
      icon: <GithubOutlined />,
      color: repos,
      link: coinData.links.repos_url.github,
      label: "Github",
    },
    {
      icon: <CodeSandboxOutlined />,
      color: repos,
      link: coinData.links.repos_url.bitbucket,
      label: "Bitbucket",
    },
  ];

  const renderReposLinks = ({ icon, color, link, label }) =>
    link[0] &&
    link.map((elLink, indx) => (
      <a key={(label, indx)} rel="noopener noreferrer" target="_blank" href={elLink}>
        <Tag icon={icon} color={color}>
          {label}
        </Tag>
      </a>
    ));

  return (
    <div className="tagLinks">
      {coinData.coingecko_rank && (
        <div className="tagRow rank">
          <div className="tagLegend">Rank</div>
          <div className="tagsContainer">
            <Tag className="rank">Rank #{coinData.coingecko_rank}</Tag>
          </div>
        </div>
      )}
      {coinData.links.homepage[0] && (
        <div className="tagRow">
          <div className="tagLegend">Website</div>
          <div className="tagsContainer">
            {coinData.links.homepage.map((item) => renderLinksLabel(item))}
          </div>
        </div>
      )}

      {coinData.links.blockchain_site[0] && (
        <div className="tagRow">
          <div className="tagLegend">Explorers</div>
          <div className="tagsContainer">
            {coinData.links.blockchain_site.map((item) =>
              renderLinksLabel(item)
            )}
          </div>
        </div>
      )}

      {checkForContent("social") && (
        <div className="tagRow social">
          <div className="tagLegend">Community</div>
          <div className="tagsContainer">
            {socialLinksStructure.map((el) => renderSocialLinks(el))}

            {coinData.links.official_forum_url &&
              coinData.links.homepage.map((item) =>
                renderLinksLabel(item, blueGray, <LinkOutlined />)
              )}
          </div>
        </div>
      )}

      {checkForContent("repos") && (
        <div className="tagRow repos">
          <div className="tagLegend">
            <span>Source Code</span>
          </div>
          <div className="tagsContainer">
            {codeReposLinks.map((el) => renderReposLinks(el))}
          </div>
        </div>
      )}
    </div>
  );
}
