import "../../App.css";
import "./Coin.css";
import React from "react";
import { Tag } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  RedditOutlined,
} from "@ant-design/icons";
import { colors } from "../../utils/const";

// TAGS.
// Rank      = .coingecko_rank
// Website   = links.homepage
// Explorers = links.blockchain_site[]
// Community = links.subreddit_url + links.twitter_screen_name +
//             links.facebook_username + links.official_forum_url
// Source Code = links.repos_url[bitbucket github]

export default function TagLinks(props) {
  const { coinData } = props;
  const { facebook, reddit, twitter } = colors;

  const renderItemLink = (item) => {
    let url, itemName;
    if (item.length) {
      url = new URL(item);
      const itemSplit = url.hostname.split(".");
      console.log("item b ", itemSplit);

      itemName = itemSplit[Math.floor((itemSplit.length - 1) / 2)]
      console.log("item b ", itemName);
    }
    return item.length ? (
      <Tag>
        <a href={item}>{itemName}</a>
      </Tag>
    ) : null;
  };
  return (
    <div className="tagLinks">
      <div>
        {console.log("COINDATAA ", coinData)}

        {coinData.coingecko_rank && (
          <div className="tagRow">
            <div className="tagLegend">Rank</div>
            <Tag className="rank">Rank #{coinData.coingecko_rank}</Tag>
          </div>
        )}
        {coinData.links.homepage && (
          <div className="tagRow">
            <div className="tagLegend">Website</div>
            {coinData.links.homepage.map((item) => renderItemLink(item))}
          </div>
        )}

        {coinData.links?.blockchain_site && (
          <div className="tagRow">
            <div className="tagLegend">Explorers</div>
            {coinData.links.blockchain_site.map((item) => renderItemLink(item))}
          </div>
        )}

        <div className="tagRow social">
          <div className="tagLegend">Community</div>

          {coinData.links?.subreddit_url && (
            <Tag icon={<RedditOutlined />} color={reddit}>
              <a href={coinData.links.links}>Reddit</a>
            </Tag>
          )}
          {coinData.links?.twitter_screen_name && (
            <Tag icon={<TwitterOutlined />} color={twitter}>
              <a href={coinData.links.twitter_screen_name}>Twitter</a>
            </Tag>
          )}
          {coinData.links?.facebook_username && (
            <Tag icon={<FacebookOutlined />} color={facebook}>
              <a
                href={`https://facebook.com/${coinData.links.facebook_username}`}
              >
                Facebook
              </a>
            </Tag>
          )}
          {coinData.links?.official_forum_url && (
            <Tag color="default">
              <a
                href={coinData.links.official_forum_url}
              >
                Forum
              </a>
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
}
