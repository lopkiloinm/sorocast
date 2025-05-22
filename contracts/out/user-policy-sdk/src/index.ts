import { SignerKey } from 'passkey-kit';  
// Define the Context type  
export type ContractContext = {  
  contract: string;  
  fn_name: string;  
  args: any[];  
};  
  
export type Context =   
  | { tag: "Contract", values: ContractContext }  
  | { tag: "CreateContractHostFn", values: any }  
  | { tag: "CreateContractWithCtorHostFn", values: any };
import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}




export const Errors = {
  1: {message:"NotAllowed"}
}

export interface Client {
  /**
   * Construct and simulate a policy__ transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  policy__: ({_source, _signer, contexts}: {_source: string, _signer: SignerKey, contexts: Array<Context>}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initalizing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAAQAAAAAAAAAKTm90QWxsb3dlZAAAAAAAAQ==",
        "AAAAAAAAAAAAAAAIcG9saWN5X18AAAADAAAAAAAAAAdfc291cmNlAAAAABMAAAAAAAAAB19zaWduZXIAAAAH0AAAAAlTaWduZXJLZXkAAAAAAAAAAAAACGNvbnRleHRzAAAD6gAAB9AAAAAHQ29udGV4dAAAAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    policy__: this.txFromJSON<null>
  }
}