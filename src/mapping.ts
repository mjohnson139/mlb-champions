import { BigInt } from "@graphprotocol/graph-ts";
import {
  Contract,
  ContractUpgrade,
  AssetUpdated,
  Created,
  Transfer,
  Approval,
  ApprovalForAll,
  ConstructorCall,
} from "../generated/Contract/Contract";
import { ExampleEntity, CollectableEntity } from "../generated/schema";

export function handleContractUpgrade(event: ContractUpgrade): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  entity.newContract = event.params.newContract;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.supportsInterface(...)
  // - contract.name(...)
  // - contract.getApproved(...)
  // - contract.implementsERC721(...)
  // - contract.createETHCardCollectible(...)
  // - contract.totalSupply(...)
  // - contract.detachmentTime(...)
  // - contract.promoCreatedCount(...)
  // - contract.generationSeasonDict(...)
  // - contract.otherManagers(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.createRewardCollectible(...)
  // - contract.MLB_Legal(...)
  // - contract.nftTeamIndexToCollectibleCount(...)
  // - contract.contractsApprovedList(...)
  // - contract.exists(...)
  // - contract.tokenByIndex(...)
  // - contract.createSeedCollectible(...)
  // - contract.checkIsAttached(...)
  // - contract.paused(...)
  // - contract.InterfaceSignature_ERC721Optional(...)
  // - contract.ownerOf(...)
  // - contract.attachedSystemActive(...)
  // - contract.getGameCardId(...)
  // - contract.isLSNFT(...)
  // - contract.newContractAddress(...)
  // - contract.getCollectibleDetails(...)
  // - contract.balanceOf(...)
  // - contract.rewardsRedeemed(...)
  // - contract.getTeamId(...)
  // - contract.getAbilitiesForCollectibleId(...)
  // - contract.tokensOfOwner(...)
  // - contract.getPositionId(...)
  // - contract.symbol(...)
  // - contract.nftCollectibleAttachments(...)
  // - contract.isBatchSupported(...)
  // - contract.nftTeamIdToSequenceIdToCollectible(...)
  // - contract.managerPrimary(...)
  // - contract.createPromoCollectible(...)
  // - contract.seedCreatedCount(...)
  // - contract.error(...)
  // - contract.tokenURI(...)
  // - contract.generationSeasonController(...)
  // - contract.saleManagerAddress(...)
  // - contract.getAssetAttachment(...)
  // - contract.isApprovedForAll(...)
  // - contract.bankManager(...)
  // - contract.ERC721_RECEIVED(...)
  // - contract.managerSecondary(...)
  // - contract.getPlayerId(...)
}

export function handleAssetUpdated(event: AssetUpdated): void {}

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

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}
