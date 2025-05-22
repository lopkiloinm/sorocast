#![no_std]

use smart_wallet_interface::{types::SignerKey, PolicyInterface};
use soroban_sdk::{
    auth::{Context, ContractContext},
    contract, contracterror, contractimpl, panic_with_error,
    symbol_short, Env, Vec, FromVal
};

const MIN_BET: i128 = 10 * 1_000_0000; // 10 XLM

#[contracterror]
#[derive(Copy, Clone, Debug, PartialEq)]
#[repr(u32)]
pub enum Error {
    NotAllowed = 1,
}

#[contract]
pub struct UserPolicyContract;

#[contractimpl]
impl PolicyInterface for UserPolicyContract {
    fn policy__(
        env: Env,
        _source: soroban_sdk::Address,
        _signer: SignerKey,
        contexts: Vec<Context>,
    ) {
        for ctx in contexts.iter() {
            match ctx {
                Context::Contract(ContractContext { fn_name, args, .. }) => {
                    // 1) Allow free transfers
                    if fn_name == symbol_short!("transfer") {
                        continue;
                    }
                    // 2) Allow placing bets (enforce min stake)
                    if fn_name == symbol_short!("placebet") {
                        let amount_val = args.get_unchecked(2);
                        let amount = i128::from_val(&env, &amount_val);
                        if amount < MIN_BET {
                            panic_with_error!(&env, Error::NotAllowed);
                        }
                        continue;
                    }
                    // 3) Allow claiming rewards
                    if fn_name == symbol_short!("claimrwd") {
                        continue;
                    }
                    // 4) Allow creating a market (calls factory, which enforces stake)
                    if fn_name == symbol_short!("crt_mkt") {
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