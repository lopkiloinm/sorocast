#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, panic_with_error,
    symbol_short, Env, Map, Address, IntoVal
};

const CREATION_STAKE: i128 = 1000 * 1_000_0000; // 1000 XLM
const MIN_BET: i128 = 5 * 1_000_0000; // 5 XLM
//const ORACLE: &str = "ORACLE_ADDRESS"; // Set to your oracle's address
const SAC_CONTRACT_ID: &str = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";

#[contracterror]
#[derive(Copy, Clone, Debug, PartialEq)]
#[repr(u32)]
pub enum Error {
    NotAllowed = 1,
    BadArgs = 2,
    AlreadyFinalized = 3,
    NotFinalized = 4,
    AlreadyBet = 5,
    NoBet = 6,
    AlreadyProposed = 7,
    NotCreator = 8,
    NotEnoughStake = 9,
    NotEnoughLiquidity = 10,
}

#[contract]
pub struct MarketContract;

#[contractimpl]
impl MarketContract {
    // Market creation with stake locking
    pub fn create_market(env: Env, creator: Address, stake: i128) {
        creator.require_auth(); // Require the smart wallet (passkey) to sign
        if stake < CREATION_STAKE {
            panic_with_error!(&env, Error::NotEnoughStake);
        }
        let creator_key = symbol_short!("creator");
        let stake_key = symbol_short!("stake");
        env.storage().instance().set(&creator_key, &creator);
        env.storage().instance().set(&stake_key, &stake);
        // Transfer stake from creator to contract (call SAC)
        let sac_addr = Address::from_str(&env, SAC_CONTRACT_ID);
        env.invoke_contract::<()>(&sac_addr, &symbol_short!("transfer"), (creator.clone(), env.current_contract_address(), stake).into_val(&env));
    }

    // Provide liquidity
    pub fn provide_liquidity(env: Env, provider: Address, amount: i128) {
        let liquidity_key = symbol_short!("liquidity");
        let mut liquidity: Map<Address, i128> = env.storage().instance().get(&liquidity_key).unwrap_or_else(|| Map::new(&env));
        let prev = liquidity.get(provider.clone()).unwrap_or(0);
        liquidity.set(provider.clone(), prev + amount);
        env.storage().instance().set(&liquidity_key, &liquidity);
        // Transfer liquidity from provider to contract (call SAC)
        let sac_addr = Address::from_str(&env, SAC_CONTRACT_ID);
        env.invoke_contract::<()>(&sac_addr, &symbol_short!("transfer"), (provider.clone(), env.current_contract_address(), amount).into_val(&env));
    }

    // Place a bet
    pub fn place_bet(env: Env, bettor: Address, outcome: u32, amount: i128) {
        if amount < MIN_BET {
            panic_with_error!(&env, Error::BadArgs);
        }
        let bets_key = symbol_short!("bets");
        let mut bets: Map<Address, (u32, i128)> = env.storage().instance().get(&bets_key).unwrap_or_else(|| Map::new(&env));
        if bets.contains_key(bettor.clone()) {
            panic_with_error!(&env, Error::AlreadyBet);
        }
        bets.set(bettor.clone(), (outcome, amount));
        env.storage().instance().set(&bets_key, &bets);
        // Transfer bet from bettor to contract (call SAC)
        let sac_addr = Address::from_str(&env, SAC_CONTRACT_ID);
        env.invoke_contract::<()>(&sac_addr, &symbol_short!("transfer"), (bettor.clone(), env.current_contract_address(), amount).into_val(&env));
    }

    // Oracle resolves the outcome (dummy: always chooses first outcome)
    pub fn resolve(env: Env) {
        let outcome_key = symbol_short!("outcome");
        if env.storage().instance().has(&outcome_key) {
            panic_with_error!(&env, Error::AlreadyFinalized);
        }
        // Dummy oracle: always sets outcome to 0 (first outcome)
        env.storage().instance().set(&outcome_key, &0u32);
    }

    // Distribute rewards to winners
    pub fn distribute_rewards(env: Env) {
        let outcome_key = symbol_short!("outcome");
        if !env.storage().instance().has(&outcome_key) {
            panic_with_error!(&env, Error::NotFinalized);
        }
        let winning_outcome = env.storage().instance().get::<_, u32>(&outcome_key).unwrap();
        let bets_key = symbol_short!("bets");
        let bets: Map<Address, (u32, i128)> = env.storage().instance().get(&bets_key).unwrap_or_else(|| Map::new(&env));
        let sac_addr = Address::from_str(&env, SAC_CONTRACT_ID);

        // Calculate total bets on winning and losing outcomes
        let mut total_winning_bets: i128 = 0;
        let mut total_losing_bets: i128 = 0;
        for (_bettor, (bet_outcome, amount)) in bets.iter() {
            if bet_outcome == winning_outcome {
                total_winning_bets += amount;
            } else {
                total_losing_bets += amount;
            }
        }
        let total_pool = total_winning_bets + total_losing_bets;

        // Distribute rewards proportionally to winners
        for (bettor, (bet_outcome, amount)) in bets.iter() {
            if bet_outcome == winning_outcome && total_winning_bets > 0 {
                // reward = (their_bet / total_winning_bets) * total_pool
                // Integer math: (their_bet * total_pool) / total_winning_bets
                let reward = (amount * total_pool) / total_winning_bets;
                env.invoke_contract::<()>(&sac_addr, &symbol_short!("transfer"), (env.current_contract_address(), bettor.clone(), reward).into_val(&env));
            }
        }
        // Optionally, return stake to creator or burn it if market was malicious
        let creator_key = symbol_short!("creator");
        let stake_key = symbol_short!("stake");
        if let (Some(creator), Some(stake)) = (
            env.storage().instance().get::<_, Address>(&creator_key),
            env.storage().instance().get::<_, i128>(&stake_key),
        ) {
            env.invoke_contract::<()>(&sac_addr, &symbol_short!("transfer"), (env.current_contract_address(), creator, stake).into_val(&env));
        }
    }
} 