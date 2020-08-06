import {
  Contract,
  AssetUpdated,
  Created,
  Transfer,
  Approval,
  ApprovalForAll,
} from "../generated/Contract/Contract";
import { CollectableEntity, SalesHistoryEntity } from "../generated/schema";

// Ethereum support
export function handleAssetUpdated(event: AssetUpdated): void {
  let contract = Contract.bind(event.address);
  let collectableDetails = contract.getCollectibleDetails(event.params.tokenId);

  let entity = new CollectableEntity(event.params.tokenId.toHex());
  entity.tokenId = event.params.tokenId;
  entity.isAttached = collectableDetails.value0;
  entity.sequenceId = collectableDetails.value1;
  entity.teamId = collectableDetails.value2;
  entity.positionId = collectableDetails.value3;
  entity.creationTime = collectableDetails.value4;
  entity.attributes = collectableDetails.value5;
  entity.playerOverrideId = collectableDetails.value6;
  entity.mlbGameId = collectableDetails.value7;
  entity.currentGameCardId = collectableDetails.value8;
  entity.mlbPlayerId = collectableDetails.value9;
  entity.earnedBy = collectableDetails.value10;
  entity.generationSeason = collectableDetails.value11;

  entity.save();
}

export function handleCreated(event: Created): void {
  let contract = Contract.bind(event.address);

  let collectableDetails = contract.getCollectibleDetails(event.params.tokenId);

  let entity = new CollectableEntity(event.params.tokenId.toHex());

  entity.tokenId = event.params.tokenId;
  entity.isAttached = collectableDetails.value0;
  entity.sequenceId = collectableDetails.value1;
  entity.teamId = collectableDetails.value2;
  entity.positionId = collectableDetails.value3;
  entity.creationTime = collectableDetails.value4;
  entity.attributes = collectableDetails.value5;
  entity.playerOverrideId = collectableDetails.value6;
  entity.mlbGameId = collectableDetails.value7;
  entity.currentGameCardId = collectableDetails.value8;
  entity.mlbPlayerId = collectableDetails.value9;
  entity.earnedBy = collectableDetails.value10;
  entity.generationSeason = collectableDetails.value11;

  entity.save();
}

export function handleTransfer(event: Transfer): void {
  let transaction = event.transaction;
  event.params._event;

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
