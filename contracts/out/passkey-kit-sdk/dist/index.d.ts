import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import type { u32, Option } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
    6: {
        message: string;
    };
    7: {
        message: string;
    };
    8: {
        message: string;
    };
    9: {
        message: string;
    };
};
export type SignerExpiration = readonly [Option<u32>];
export type SignerLimits = readonly [Option<Map<string, Option<Array<SignerKey>>>>];
export type SignerStorage = {
    tag: "Persistent";
    values: void;
} | {
    tag: "Temporary";
    values: void;
};
export type Signer = {
    tag: "Policy";
    values: readonly [string, SignerExpiration, SignerLimits, SignerStorage];
} | {
    tag: "Ed25519";
    values: readonly [Buffer, SignerExpiration, SignerLimits, SignerStorage];
} | {
    tag: "Secp256r1";
    values: readonly [Buffer, Buffer, SignerExpiration, SignerLimits, SignerStorage];
};
export type SignerKey = {
    tag: "Policy";
    values: readonly [string];
} | {
    tag: "Ed25519";
    values: readonly [Buffer];
} | {
    tag: "Secp256r1";
    values: readonly [Buffer];
};
export type SignerVal = {
    tag: "Policy";
    values: readonly [SignerExpiration, SignerLimits];
} | {
    tag: "Ed25519";
    values: readonly [SignerExpiration, SignerLimits];
} | {
    tag: "Secp256r1";
    values: readonly [Buffer, SignerExpiration, SignerLimits];
};
export interface Secp256r1Signature {
    authenticator_data: Buffer;
    client_data_json: Buffer;
    signature: Buffer;
}
export type Signature = {
    tag: "Policy";
    values: void;
} | {
    tag: "Ed25519";
    values: readonly [Buffer];
} | {
    tag: "Secp256r1";
    values: readonly [Secp256r1Signature];
};
export type Signatures = readonly [Map<SignerKey, Signature>];
export interface Client {
    /**
     * Construct and simulate a add_signer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    add_signer: ({ signer }: {
        signer: Signer;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_signer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_signer: ({ signer }: {
        signer: Signer;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a remove_signer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    remove_signer: ({ signer_key }: {
        signer_key: SignerKey;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a update_contract_code transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    update_contract_code: ({ hash }: {
        hash: Buffer;
    }, options?: {
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
    }) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Constructor/Initialization Args for the contract's `__constructor` method */
    { signer }: {
        signer: Signer;
    }, 
    /** Options for initalizing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        add_signer: (json: string) => AssembledTransaction<null>;
        update_signer: (json: string) => AssembledTransaction<null>;
        remove_signer: (json: string) => AssembledTransaction<null>;
        update_contract_code: (json: string) => AssembledTransaction<null>;
    };
}
