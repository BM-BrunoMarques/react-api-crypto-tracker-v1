import "../../App.css";
import "./Coin.css";
import React from "react";
import { Tag } from "antd";

// TAGS.
// Rank      = .coingecko_rank
// Website   = links.homepage
// Explorers = links.blockchain_site[]
// Community = links.subreddit_url + links.twitter_screen_name +
//             links.facebook_username + links.official_forum_url
// Source Code = links.repos_url[bitbucket github]

export default function TagLinks(props) {
  const { coinData } = props;
  console.log(coinData);
  const renderItemLink = (item) => {
    let url, itemName;
    if (item.length) {
      url = new URL(item);
      console.log('url ',url);
      itemName = url.hostname.split("/").pop();
    }
    return item.length ? (
      <Tag>
        <a href={item}>{itemName}</a>
      </Tag>
    ) : null;
  };
  return (
    <div className="tagLinks">
      {coinData.links && (
        <div>
          {console.log("COINDATAA ", coinData)}

          {coinData.coingecko_rank ? (
            <div className="tagRow">
              <div className="tagLegend">Rank</div>
              <Tag>{coinData.coingecko_rank}</Tag>
            </div>
          ) : null}
          {coinData.links.homepage ? (
            <div className="tagRow">
              <div className="tagLegend">Website</div>
              {coinData.links.homepage.map((item) => renderItemLink(item))}
            </div>
          ) : null}

          {coinData.links?.blockchain_site ? (
            <div className="tagRow">
              <div className="tagLegend">Explorers</div>
              {coinData.links.blockchain_site.map((item) =>
                renderItemLink(item)
              )}
            </div>
          ) : null}

          <div className="tagRow">
            {coinData.links?.subreddit_url && (
              <div className="tagItem">{coinData.links.subreddit_url}</div>
            )}
            {coinData.links?.twitter_screen_name && (
              <div className="tagItem">
                {coinData.links.twitter_screen_name}
              </div>
            )}
            {coinData.links?.facebook_username && (
              <div className="tagItem">{coinData.links.facebook_username}</div>
            )}
            {coinData.links?.official_forum_url && (
              <div className="tagItem">{coinData.links.official_forum_url}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
