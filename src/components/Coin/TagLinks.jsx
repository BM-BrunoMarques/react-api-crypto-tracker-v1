import "../../App.css";
import "./Coin.css";
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
import { colors } from "../../utils/const";

export default function TagLinks(props) {
  const { coinData } = props;
  const { facebook, reddit, twitter, telegram, repos, blueGray } = colors;

  const renderItemLink = (item, color, icon) => {
    let url, itemName;
    if (item.length) {
      url = new URL(item);
      const itemSplit = url.hostname.split(".");

      itemName = itemSplit[Math.floor((itemSplit.length - 1) / 2)];
    }
    return item.length ? (
      <Tag icon={icon} color={color}>
        <a href={item}>{itemName}</a>
      </Tag>
    ) : null;
  };

  const checkForContent = (section) => {
    switch (section) {
      case "social":
        if (
          coinData.links.subreddit_url?.length ||
          coinData.links.twitter_screen_name?.length ||
          coinData.links.facebook_username?.length ||
          coinData.links.telegram_channel_identifier?.length ||
          coinData.links.official_forum_url[0]
        ) {
          return true;
        } else {
          return false;
        }
        break;
      default:
    }
  };

  return (
    <div className="tagLinks">
      {coinData.coingecko_rank && (
        <div className="tagRow">
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
            {coinData.links.homepage.map((item) => renderItemLink(item))}
          </div>
        </div>
      )}

      {coinData.links.blockchain_site[0] && (
        <div className="tagRow">
          <div className="tagLegend">Explorers</div>
          <div className="tagsContainer">
            {coinData.links.blockchain_site.map((item) => renderItemLink(item))}
          </div>
        </div>
      )}

      {checkForContent("social") && (
        <div className="tagRow social">
          <div className="tagLegend">Community</div>
          <div className="tagsContainer">
            {coinData.links.subreddit_url && (
              <Tag icon={<RedditOutlined />} color={reddit}>
                <a href={coinData.links.subreddit_url}>Reddit</a>
              </Tag>
            )}
            {coinData.links.twitter_screen_name && (
              <Tag icon={<TwitterOutlined />} color={twitter}>
                <a
                  href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                >
                  Twitter
                </a>
              </Tag>
            )}
            {coinData.links.facebook_username && (
              <Tag icon={<FacebookOutlined />} color={facebook}>
                <a
                  href={`https://facebook.com/${coinData.links.facebook_username}`}
                >
                  Facebook
                </a>
              </Tag>
            )}
            {coinData.links.telegram_channel_identifier && (
              <Tag icon={<SendOutlined />} color={telegram}>
                <a
                  href={`https://t.me/${coinData.links.telegram_channel_identifier}`}
                >
                  Telegram
                </a>
              </Tag>
            )}
            {coinData.links.official_forum_url &&
              coinData.links.homepage.map((item) =>
                renderItemLink(item, blueGray, <LinkOutlined />)
              )}
          </div>
        </div>
      )}

      {(coinData.links.repos_url.github[0] ||
        coinData.links.repos_url.bitbucket[0]) && (
        <div className="tagRow repos">
          <div className="tagLegend">
            <span>Source Code</span>
          </div>
          <div className="tagsContainer">
            {coinData.links.repos_url.github.map((item, indx) => {
              if (!item.length) return;

              return (
                <Tag
                  key={`${item} ${indx}`}
                  icon={<GithubOutlined />}
                  color={repos}
                >
                  <a href={item}>Github</a>
                </Tag>
              );
            })}
            {coinData.links.repos_url.bitbucket.map((item) => {
              if (!item.length) return;

              return (
                <Tag
                  icon={<CodeSandboxOutlined />}
                  className="forum"
                  color={repos}
                >
                  <a href={item}>Bitbucket</a>
                </Tag>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
