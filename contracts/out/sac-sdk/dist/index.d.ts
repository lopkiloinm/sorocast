import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import type { u32, i128 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";
    };
};
export declare const Errors: {};
export interface Client {
    /**
     * Construct and simulate a allowance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns the allowance for `spender` to transfer from `from`.
     *
     * The amount returned is the amount that spender is allowed to transfer
     * out of from's balance. When the spender transfers amounts, the allowance
     * will be reduced by the amount transferred.
     *
     * # Arguments
     *
     * * `from` - The address holding the balance of tokens to be drawn from.
     * * `spender` - The address spending the tokens held by `from`.
     */
    allowance: ({ from, spender }: {
        from: string;
        spender: string;
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
    }) => Promise<AssembledTransaction<i128>>;
    /**
     * Construct and simulate a authorized transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns true if `id` is authorized to use its balance.
     *
     * # Arguments
     *
     * * `id` - The address for which token authorization is being checked.
     */
    authorized: ({ id }: {
        id: string;
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
    }) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Set the allowance by `amount` for `spender` to transfer/burn from
     * `from`.
     *
     * The amount set is the amount that spender is approved to transfer out of
     * from's balance. The spender will be allowed to transfer amounts, and
     * when an amount is transferred the allowance will be reduced by the
     * amount transferred.
     *
     * # Arguments
     *
     * * `from` - The address holding the balance of tokens to be drawn from.
     * * `spender` - The address being authorized to spend the tokens held by
     * `from`.
     * * `amount` - The tokens to be made available to `spender`.
     * * `expiration_ledger` - The ledger number where this allowance expires. Cannot
     * be less than the current ledger number unless the amount is being set to 0.
     * An expired entry (where expiration_ledger < the current ledger number)
     * should be treated as a 0 amount allowance.
     *
     * # Events
     *
     * Emits an event with topics `["approve", from: Address,
     * spender: Address], data = [amount: i128, expiration_ledger: u32]`
     */
    approve: ({ from, spender, amount, expiration_ledger }: {
        from: string;
        spender: string;
        amount: i128;
        expiration_ledger: u32;
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
     * Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns the balance of `id`.
     *
     * # Arguments
     *
     * * `id` - The address for which a balance is being queried. If the
     * address has no existing balance, returns 0.
     */
    balance: ({ id }: {
        id: string;
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
    }) => Promise<AssembledTransaction<i128>>;
    /**
     * Construct and simulate a burn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Burn `amount` from `from`.
     *
     * Reduces from's balance by the amount, without transferring the balance
     * to another holder's balance.
     *
     * # Arguments
     *
     * * `from` - The address holding the balance of tokens which will be
     * burned from.
     * * `amount` - The amount of tokens to be burned.
     *
     * # Events
     *
     * Emits an event with topics `["burn", from: Address], data = amount:
     * i128`
     */
    burn: ({ from, amount }: {
        from: string;
        amount: i128;
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
     * Construct and simulate a burn_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Burn `amount` from `from`, consuming the allowance of `spender`.
     *
     * Reduces from's balance by the amount, without transferring the balance
     * to another holder's balance.
     *
     * The spender will be allowed to burn the amount from from's balance, if
     * the amount is less than or equal to the allowance that the spender has
     * on the from's balance. The spender's allowance on from's balance will be
     * reduced by the amount.
     *
     * # Arguments
     *
     * * `spender` - The address authorizing the burn, and having its allowance
     * consumed during the burn.
     * * `from` - The address holding the balance of tokens which will be
     * burned from.
     * * `amount` - The amount of tokens to be burned.
     *
     * # Events
     *
     * Emits an event with topics `["burn", from: Address], data = amount:
     * i128`
     */
    burn_from: ({ spender, from, amount }: {
        spender: string;
        from: string;
        amount: i128;
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
     * Construct and simulate a clawback transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Clawback `amount` from `from` account. `amount` is burned in the
     * clawback process.
     *
     * # Arguments
     *
     * * `from` - The address holding the balance from which the clawback will
     * take tokens.
     * * `amount` - The amount of tokens to be clawed back.
     *
     * # Events
     *
     * Emits an event with topics `["clawback", admin: Address, to: Address],
     * data = amount: i128`
     */
    clawback: ({ from, amount }: {
        from: string;
        amount: i128;
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
     * Construct and simulate a decimals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns the number of decimals used to represent amounts of this token.
     *
     * # Panics
     *
     * If the contract has not yet been initialized.
     */
    decimals: (options?: {
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
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Mints `amount` to `to`.
     *
     * # Arguments
     *
     * * `to` - The address which will receive the minted tokens.
     * * `amount` - The amount of tokens to be minted.
     *
     * # Events
     *
     * Emits an event with topics `["mint", admin: Address, to: Address], data
     * = amount: i128`
     */
    mint: ({ to, amount }: {
        to: string;
        amount: i128;
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
     * Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns the name for this token.
     *
     * # Panics
     *
     * If the contract has not yet been initialized.
     */
    name: (options?: {
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
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Sets the administrator to the specified address `new_admin`.
     *
     * # Arguments
     *
     * * `new_admin` - The address which will henceforth be the administrator
     * of this token contract.
     *
     * # Events
     *
     * Emits an event with topics `["set_admin", admin: Address], data =
     * [new_admin: Address]`
     */
    set_admin: ({ new_admin }: {
        new_admin: string;
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
     * Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns the admin of the contract.
     *
     * # Panics
     *
     * If the admin is not set.
     */
    admin: (options?: {
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
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a set_authorized transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Sets whether the account is authorized to use its balance. If
     * `authorized` is true, `id` should be able to use its balance.
     *
     * # Arguments
     *
     * * `id` - The address being (de-)authorized.
     * * `authorize` - Whether or not `id` can use its balance.
     *
     * # Events
     *
     * Emits an event with topics `["set_authorized", id: Address], data =
     * [authorize: bool]`
     */
    set_authorized: ({ id, authorize }: {
        id: string;
        authorize: boolean;
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
     * Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Returns the symbol for this token.
     *
     * # Panics
     *
     * If the contract has not yet been initialized.
     */
    symbol: (options?: {
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
    }) => Promise<AssembledTransaction<string>>;
    /**
     * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Transfer `amount` from `from` to `to`.
     *
     * # Arguments
     *
     * * `from` - The address holding the balance of tokens which will be
     * withdrawn from.
     * * `to` - The address which will receive the transferred tokens.
     * * `amount` - The amount of tokens to be transferred.
     *
     * # Events
     *
     * Emits an event with topics `["transfer", from: Address, to: Address],
     * data = amount: i128`
     */
    transfer: ({ from, to, amount }: {
        from: string;
        to: string;
        amount: i128;
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
     * Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Transfer `amount` from `from` to `to`, consuming the allowance that
     * `spender` has on `from`'s balance. Authorized by spender
     * (`spender.require_auth()`).
     *
     * The spender will be allowed to transfer the amount from from's balance
     * if the amount is less than or equal to the allowance that the spender
     * has on the from's balance. The spender's allowance on from's balance
     * will be reduced by the amount.
     *
     * # Arguments
     *
     * * `spender` - The address authorizing the transfer, and having its
     * allowance consumed during the transfer.
     * * `from` - The address holding the balance of tokens which will be
     * withdrawn from.
     * * `to` - The address which will receive the transferred tokens.
     * * `amount` - The amount of tokens to be transferred.
     *
     * # Events
     *
     * Emits an event with topics `["transfer", from: Address, to: Address],
     * data = amount: i128`
     */
    transfer_from: ({ spender, from, to, amount }: {
        spender: string;
        from: string;
        to: string;
        amount: i128;
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
        allowance: (json: string) => AssembledTransaction<bigint>;
        authorized: (json: string) => AssembledTransaction<boolean>;
        approve: (json: string) => AssembledTransaction<null>;
        balance: (json: string) => AssembledTransaction<bigint>;
        burn: (json: string) => AssembledTransaction<null>;
        burn_from: (json: string) => AssembledTransaction<null>;
        clawback: (json: string) => AssembledTransaction<null>;
        decimals: (json: string) => AssembledTransaction<number>;
        mint: (json: string) => AssembledTransaction<null>;
        name: (json: string) => AssembledTransaction<string>;
        set_admin: (json: string) => AssembledTransaction<null>;
        admin: (json: string) => AssembledTransaction<string>;
        set_authorized: (json: string) => AssembledTransaction<null>;
        symbol: (json: string) => AssembledTransaction<string>;
        transfer: (json: string) => AssembledTransaction<null>;
        transfer_from: (json: string) => AssembledTransaction<null>;
    };
}
