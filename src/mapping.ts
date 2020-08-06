import { BigInt } from "@graphprotocol/graph-ts";

import {
  Contract,
  AssetUpdated,
  Created,
  Transfer,
  Approval,
  ApprovalForAll,
  Contract__getCollectibleDetailsResult,
} from "../generated/Contract/Contract";
import { CollectableEntity, SalesHistoryEntity } from "../generated/schema";

// Ethereum support
export function handleAssetUpdated(event: AssetUpdated): void {
  let contract = Contract.bind(event.address);
  let collectableDetails = contract.getCollectibleDetails(event.params.tokenId);
  let tokenId = event.params.tokenId;
  let tokenURI = contract.tokenURI(tokenId);

  let entity = createCollectableEntity(tokenId, tokenURI, collectableDetails);
  entity.save();
}

export function handleCreated(event: Created): void {
  let tokenId = event.params.tokenId;

  let contract = Contract.bind(event.address);
  let collectableDetails = contract.getCollectibleDetails(tokenId);
  let tokenURI = contract.tokenURI(tokenId);

  let entity = createCollectableEntity(tokenId, tokenURI, collectableDetails);

  entity.save();
}

function createCollectableEntity(
  tokenId: BigInt,
  tokenURI: string,
  details: Contract__getCollectibleDetailsResult
): CollectableEntity {
  let entity = new CollectableEntity(tokenId.toHex());

  entity.tokenId = tokenId;
  entity.isAttached = details.value0;
  entity.sequenceId = details.value1;

  entity.teamId = details.value2;
  let teamName = convertTeamId(entity.teamId);
  entity.teamName = teamName;

  entity.positionId = details.value3;
  let positionName = convertPositionId(entity.positionId);
  entity.positionName = positionName;

  entity.creationTime = details.value4;
  entity.attributes = details.value5;
  entity.playerOverrideId = details.value6;
  entity.mlbGameId = details.value7;
  entity.currentGameCardId = details.value8;
  entity.mlbPlayerId = details.value9;
  entity.earnedBy = details.value10;
  entity.generationSeason = details.value11;
  entity.tokenURI = tokenURI;

  return entity;
}

export function handleTransfer(event: Transfer): void {
  let transaction = event.transaction;

  let entity = new SalesHistoryEntity(transaction.hash.toHex());

  entity.transactionHash = transaction.hash;
  entity.tokenId = event.params._tokenId;
  entity.sellerAddress = transaction.from;
  entity.buyerAddress = transaction.to;
  entity.value = transaction.value;
  entity.gasUsed = transaction.gasUsed;
  entity.gasPrice = transaction.gasPrice;
  entity.timeStamp = event.block.timestamp;

  //Create the Entity Relationship
  entity.collectable = event.params._tokenId.toHex();
  entity.save();
}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

function convertPositionId(positionId: i32): string {
  switch (positionId) {
    case 5:
      return "1st Baseman";
    case 6:
      return "2nd Baseman";
    case 7:
      return "3rd Baseman";
    case 10:
      return "Anywhere";
    case 9:
      return "Catcher";
    case 3:
      return "Center Fielder";
    case 11:
      return "Designated Hitter";
    case 2:
      return "Left Fielder";
    case 1:
      return "Pitcher";
    case 4:
      return "Right Fielder";
    case 8:
      return "Shortstop";
    default:
      return "";
  }
}

function convertTeamId(teamId: i32): string {
  switch (teamId) {
    case 8:
      return "Arizona Diamondbacks";
    case 23:
      return "Atlanta Braves";
    case 20:
      return "Baltimore Orioles";
    case 7:
      return "Boston Red Sox";
    case 3:
      return "Chicago Cubs";
    case 27:
      return "Chicago White Sox";
    case 26:
      return "Cincinnati Reds";
    case 5:
      return "Cleveland Indians";
    case 9:
      return "Colorado Rockies";
    case 29:
      return "Detroit Tigers";
    case 1:
      return "Houston Astros";
    case 14:
      return "Kansas City Royals";
    case 13:
      return "Los Angeles Angels";
    case 2:
      return "Los Angeles Dodgers";
    case 18:
      return "Miami Marlins";
    case 11:
      return "Milwaukee Brewers";
    case 10:
      return "Minnesota Twins";
    case 25:
      return "New York Mets";
    case 4:
      return "New York Yankees";
    case 21:
      return "Oakland Athletics";
    case 28:
      return "Philadelphia Phillies";
    case 22:
      return "Pittsburgh Pirates";
    case 24:
      return "San Diego Padres";
    case 30:
      return "San Francisco Giants";
    case 16:
      return "Seattle Mariners";
    case 99:
      return "Special Team";
    case 12:
      return "St. Louis Cardinals";
    case 15:
      return "Tampa Bay Rays";
    case 17:
      return "Texas Rangers";
    case 9:
      return "Toronto Blue Jays";
    case 6:
      return "Washington Nationals";
    default:
      return "";
  }
}
