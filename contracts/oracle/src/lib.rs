#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Env, Map, Address};

#[contract]
pub struct OracleContract;

#[contractimpl]
impl OracleContract {
    // Set the outcome for a market (dummy: anyone can call)
    pub fn set_outcome(env: Env, market: Address, outcome: u32) {
        let key = symbol_short!("outcomes");
        let mut outcomes: Map<Address, u32> = env.storage().instance().get(&key).unwrap_or_else(|| Map::new(&env));
        outcomes.set(market, outcome);
        env.storage().instance().set(&key, &outcomes);
    }

    // Get the outcome for a market
    pub fn get_outcome(env: Env, market: Address) -> Option<u32> {
        let key = symbol_short!("outcomes");
        let outcomes: Map<Address, u32> = env.storage().instance().get(&key).unwrap_or_else(|| Map::new(&env));
        outcomes.get(market)
    }
}
