import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ExampleEvent } from "../generated/ExampleContract/ExampleContract";
import { ExampleEntity, ExampleContract } from "../generated/schema";

export function handleExampleEvent(event: ExampleEvent): void {
  // Create or load the contract entity
  let contract = ExampleContract.load(event.address.toHexString());
  if (contract == null) {
    contract = new ExampleContract(event.address.toHexString());
    contract.totalEvents = BigInt.fromI32(0);
    contract.lastEventTimestamp = BigInt.fromI32(0);
  }

  // Create new entity
  let entity = new ExampleEntity(
    event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  );
  entity.address = event.params.address;
  entity.value = event.params.value;
  entity.timestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.contract = contract.id;

  // Update contract stats
  contract.totalEvents = contract.totalEvents.plus(BigInt.fromI32(1));
  contract.lastEventTimestamp = event.block.timestamp;

  // Save entities
  entity.save();
  contract.save();
}
