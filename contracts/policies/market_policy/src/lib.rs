#![no_std]

use smart_wallet_interface::{types::SignerKey, PolicyInterface};
use soroban_sdk::{
    auth::{Context, ContractContext},
    contract, contracterror, contractimpl, panic_with_error,
    symbol_short, Env, Vec, FromVal, Address
};

const CREATION_STAKE: i128 = 1000 * 1_000_0000; // 1000 XLM
const MIN_BET: i128 = 5 * 1_000_0000; // 5 XLM

// Use actual contract IDs in production
const ORACLE_CONTRACT_ID: &str = "ORACLE_CONTRACT_ID";
const PROTOCOL_CONTRACT_ID: &str = "PROTOCOL_CONTRACT_ID";

fn oracle_key(env: &Env) -> SignerKey {
    SignerKey::Policy(Address::from_str(env, ORACLE_CONTRACT_ID))
}
fn protocol_key(env: &Env) -> SignerKey {
    SignerKey::Policy(Address::from_str(env, PROTOCOL_CONTRACT_ID))
}

#[contracterror]
#[derive(Copy, Clone, Debug, PartialEq)]
#[repr(u32)]
pub enum Error {
    NotAllowed = 1,
    BadArgs = 2,
}

#[contract]
pub struct MarketPolicyContract;

#[contractimpl]
impl PolicyInterface for MarketPolicyContract {
    fn policy__(
        env: Env,
        _source: soroban_sdk::Address,
        signer: SignerKey,
        contexts: Vec<Context>,
    ) {
        for ctx in contexts.iter() {
            match ctx {
                Context::Contract(ContractContext { fn_name, args, .. }) => {
                    // 1) Market initialization (staking)
                    if fn_name == symbol_short!("init") {
                        let stake = i128::from_val(&env, &args.get_unchecked(2));
                        if stake < CREATION_STAKE {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 2) Place bet (enforce min bet)
                    if fn_name == symbol_short!("placebet") {
                        let amount = i128::from_val(&env, &args.get_unchecked(2));
                        if amount < MIN_BET {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 3) Propose outcome (only oracle)
                    if fn_name == symbol_short!("propose") {
                        if signer != oracle_key(&env) {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 4) Finalize outcome (only protocol)
                    if fn_name == symbol_short!("finalize") {
                        if signer != protocol_key(&env) {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 5) Distribute rewards (only protocol)
                    if fn_name == symbol_short!("distrib") {
                        if signer != protocol_key(&env) {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 6) Return stake to creator (only protocol, after valid resolution)
                    if fn_name == symbol_short!("retstake") {
                        if signer != protocol_key(&env) {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 7) Slash stake (only protocol, for slashing bad actors)
                    if fn_name == symbol_short!("slashstk") {
                        if signer != protocol_key(&env) {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // All other calls are forbidden
                    panic_with_error!(&env, Error::NotAllowed);
                }
                _ => panic_with_error!(&env, Error::NotAllowed),
            }
        }
    }
} 